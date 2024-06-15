package com.kdu.ibe.service;


import com.azure.communication.email.models.*;
import com.azure.communication.email.*;
import com.azure.core.util.polling.LongRunningOperationStatus;
import com.azure.core.util.polling.PollResponse;
import com.azure.core.util.polling.SyncPoller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class EmailService {

    @Value("${emailConnectionString}")
    private String emailConnectionString;

    @Value("${senderMailAddress}")
    private String senderMailAddress;

    private static final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);


    EmailClient emailClient;


    public  void scheduleEmail(String recipient,String body, Duration delay,String subject) {
        // Schedule the email sending task
        scheduler.schedule(() -> sendEmail(recipient, body,subject), delay.toMillis(), TimeUnit.MILLISECONDS);
    }

    public void sendEmail(String recieverMail,String data,String subject){
        emailClient = new EmailClientBuilder()
                .connectionString(emailConnectionString)
                .buildClient();
        EmailMessage message = new EmailMessage()
                .setSenderAddress(senderMailAddress)
                .setToRecipients(recieverMail)
                .setSubject(subject)
                .setBodyHtml(data);


        try
        {
            SyncPoller<EmailSendResult, EmailSendResult> poller = emailClient.beginSend(message, null);

            PollResponse<EmailSendResult> pollResponse = null;

            Duration timeElapsed = Duration.ofSeconds(0);
            Duration POLLER_WAIT_TIME = Duration.ofSeconds(10);

            while (pollResponse == null
                    || pollResponse.getStatus() == LongRunningOperationStatus.NOT_STARTED
                    || pollResponse.getStatus() == LongRunningOperationStatus.IN_PROGRESS)
            {
                pollResponse = poller.poll();
                System.out.println("Email send poller status: " + pollResponse.getStatus());

                Thread.sleep(POLLER_WAIT_TIME.toMillis());
                timeElapsed = timeElapsed.plus(POLLER_WAIT_TIME);

                if (timeElapsed.compareTo(POLLER_WAIT_TIME.multipliedBy(18)) >= 0)
                {
                    throw new RuntimeException("Polling timed out.");
                }
            }

            if (poller.getFinalResult().getStatus() == EmailSendStatus.SUCCEEDED)
            {
                System.out.printf("Successfully sent the email (operation id: %s)", poller.getFinalResult().getId());
            }
            else
            {
                throw new RuntimeException(poller.getFinalResult().getError().getMessage());
            }
        }
        catch (Exception exception)
        {
            System.out.println(exception.getMessage());
        }
    }
}
