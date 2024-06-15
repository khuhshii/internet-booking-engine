import './combined.style.scss'

function CancellationMessage() {
  return (
    <div>
      <p><b>If you are a logged-in user:</b></p>
      <p>1.you can go to <b>'My Bookings'</b></p>
      <p>2.click on the booking you want to cancel</p>
      <p>3.click on 'Cancel'.</p>
      <p><b>If you are a guest user: </b></p>
      <p>1.please use the booking link you received in the mail</p>
      <p>2.click on 'Cancel'.</p>
      <p>3.You will receive an OTP, enter the OTP, and the booking will be cancelled.</p>
      <p>Still need support? Please contact our support team at <a href="mailto:sasi.rachapotu@gmail.com">support</a> for assistance with cancellation.</p>
    </div>
  )
}

export default CancellationMessage