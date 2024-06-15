package com.kdu.ibe.service;

import com.kdu.ibe.dto.bookings.BookingFinalRequestDTO;
import com.kdu.ibe.entity.GuestUserEntity;
import com.kdu.ibe.entity.bookings.*;
import com.kdu.ibe.exception.customExceptions.BookingNotFoundException;
import com.kdu.ibe.exception.customExceptions.UnAuthorizedException;
import com.kdu.ibe.exception.customExceptions.UserNotFoundException;
import com.kdu.ibe.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StoreBookingService {

    private final BookingRepository bookingRepository;
    private final GuestUserRepository guestUserRepository;

    private final BillingRepository billingRepository;

    private final PaymentRepository paymentRepository;

    private final PromotionRepository promotionRepository;

    private final CostRepository costRepository;

    private final LogInUsersRepository logInUsersRepository;

    public StoreBookingService(BookingRepository bookingRepository, GuestUserRepository guestUserRepository, BillingRepository billingRepository,PaymentRepository paymentRepository, PromotionRepository promotionRepository,CostRepository costRepository, LogInUsersRepository logInUsersRepository){
        this.bookingRepository = bookingRepository;
        this.guestUserRepository=guestUserRepository;
        this.billingRepository = billingRepository;
        this.paymentRepository=paymentRepository;
        this.promotionRepository = promotionRepository;
        this.costRepository = costRepository;
        this.logInUsersRepository=logInUsersRepository;
    }

    public BookingEntity getBookingById(Long id){
        return bookingRepository.findById(id).orElse(null);
    }

    public List<BookingEntity> getBookingByMailId(String email,String jwtToken){
        LogInUsers logInUsers = logInUsersRepository.findById(email).orElse(null);
        if(logInUsers==null){
            throw new UserNotFoundException();
        }
        if(!logInUsers.getJwtToken().equals(jwtToken)){
            throw new UnAuthorizedException();
        }
        return logInUsers.getBookings();
    }

    public void saveBookingForUser(Long userId, BookingFinalRequestDTO bookingDTO,Long bookingId) {
        GuestUserEntity user = guestUserRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        BookingEntity booking = new BookingEntity();
        booking.setBookingId(bookingId);
        booking.setStartDate(bookingDTO.getStartDate());
        booking.setEndDate(bookingDTO.getEndDate());
        booking.setRoomCount(bookingDTO.getRoomCount());
        booking.setAdultCount(bookingDTO.getAdultCount());
        booking.setTeenCount(bookingDTO.getTeenCount());
        booking.setKidCount(bookingDTO.getKidCount());
        booking.setPropertyId(bookingDTO.getPropertyId());
        booking.setRoomTypeId(bookingDTO.getRoomTypeId());
        booking.setRoomType(bookingDTO.getRoomTypeName());

        // Save CostDTO
        BookingFinalRequestDTO.CostDTO costDTO = bookingDTO.getCostInfo();
        CostEntity costEntity = new CostEntity();
        costEntity.setTotalCost(costDTO.getTotalCost());
        costEntity.setAmountDueAtResort(costDTO.getAmountDueAtResort());
        costEntity.setNightlyRate(costDTO.getNightlyRate());
        costEntity.setTaxes(costDTO.getTaxes());
        costEntity.setVat(costDTO.getVat());
        costRepository.save(costEntity);
        booking.setCost(costEntity);

        // Save PromotionDTO if provided
        BookingFinalRequestDTO.PromotionDTO promotionDTO = bookingDTO.getPromotionInfo();
        if (promotionDTO != null) {
            PromotionEntity promotionEntity = new PromotionEntity();
            promotionEntity.setPromotionId(promotionDTO.getPromotionId());
            promotionEntity.setPromotionTitle(promotionDTO.getPromotionTitle());
            promotionEntity.setPriceFactor(promotionDTO.getPriceFactor());
            promotionEntity.setPromotionDescription(promotionDTO.getPromotionDescription());
            promotionRepository.save(promotionEntity);
            booking.setPromotion(promotionEntity);
        }

        // Save BillingDTO
        BookingFinalRequestDTO.BillingDTO billingDTO = bookingDTO.getBillingInfo();
        BillingEntity billingEntity = new BillingEntity();
        billingEntity.setFirstName(billingDTO.getFirstName());
        billingEntity.setLastName(billingDTO.getLastName());
        billingEntity.setAddress1(billingDTO.getAddress1());
        billingEntity.setAddress2(billingDTO.getAddress2());
        billingEntity.setCity(billingDTO.getCity());
        billingEntity.setZipcode(billingDTO.getZipcode());
        billingEntity.setState(billingDTO.getState());
        billingEntity.setCountry(billingDTO.getCountry());
        billingEntity.setPhone(billingDTO.getPhone());
        billingEntity.setEmailId(billingDTO.getEmailId());
        billingRepository.save(billingEntity);
        booking.setBilling(billingEntity);

        // Save PaymentDTO
        BookingFinalRequestDTO.PaymentDTO paymentDTO = bookingDTO.getPaymentInfo();
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setCardNumber(paymentDTO.getCardNumber());
        paymentEntity.setExpiryMonth(paymentDTO.getExpiryMonth());
        paymentEntity.setExpiryYear(paymentDTO.getExpiryYear());
        paymentRepository.save(paymentEntity);
        booking.setPayment(paymentEntity);

        // Associate booking with user
        booking.setUser(user);

        // Save booking
        bookingRepository.save(booking);

        if(bookingDTO.getEmailId()!=null && !bookingDTO.getEmailId().isEmpty() && !bookingDTO.getEmailId().isBlank()){
            LogInUsers logInUsers = logInUsersRepository.findById(bookingDTO.getEmailId()).orElse(null);
            BookingEntity bookingEntity = bookingRepository.findById(bookingId).orElse(null);

            if(bookingEntity==null){
                throw new BookingNotFoundException();
            }
            if(logInUsers == null){
                LogInUsers logInUsers1 = new LogInUsers();
                logInUsers1.setEmailId(bookingDTO.getEmailId());

                List<BookingEntity> bookingEntityList = new ArrayList<>();
                bookingEntityList.add(bookingEntity);
                logInUsers1.setBookings(bookingEntityList);
                logInUsersRepository.save(logInUsers1);
            }
            else{
                List<BookingEntity> bookings = logInUsers.getBookings();
                bookings.add(bookingEntity);
                logInUsers.setBookings(bookings);
                logInUsersRepository.save(logInUsers);
            }
        }
    }
}
