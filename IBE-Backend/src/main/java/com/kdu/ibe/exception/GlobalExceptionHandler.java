package com.kdu.ibe.exception;

import com.kdu.ibe.dto.error.ErrorDto;
import com.kdu.ibe.exception.customExceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TenantNotFoundexception.class)
    public ResponseEntity<ErrorDto> handleTenantNotFoundException(TenantNotFoundexception tenantNotFoundexception){

        return new ResponseEntity<>(new ErrorDto(404,"Tenant not found with the specified id"),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RoomNotFoundException.class)
    public  ResponseEntity<ErrorDto> handleRoomNotFoundException(RoomNotFoundException roomNotFoundException){
        return new ResponseEntity<>(new ErrorDto(400,"Room not found exception"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WrongDatesError.class)
    public ResponseEntity<ErrorDto> handleWrongDatesException(WrongDatesError wrongDatesError){

        return new ResponseEntity<>(new ErrorDto(400,"Wrong dates input"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPromotionException.class)
    public ResponseEntity<ErrorDto> handleWrongDatesException(InvalidPromotionException invalidPromotionException){

        return new ResponseEntity<>(new ErrorDto(400,"Invalid Promo code"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(PropertyNotFoundException.class)
    public ResponseEntity<ErrorDto> handlePropertyNotFound(PropertyNotFoundException propertyNotFoundException){

        return new ResponseEntity<>(new ErrorDto(400,"Property not found"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RoomTypeNotFoundException.class)
    public ResponseEntity<ErrorDto> handleRoomTypeNotFound(RoomTypeNotFoundException roomTypeNotFoundException){

        return new ResponseEntity<>(new ErrorDto(400,"Room type not found"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidZipCodeException.class)
    public ResponseEntity<ErrorDto> handleRoomTypeNotFound(InvalidZipCodeException roomTypeNotFoundException){

        return new ResponseEntity<>(new ErrorDto(400,"Invalid Zip Code"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BookingNotFoundException.class)
    public ResponseEntity<ErrorDto> handleBookingNotFound(BookingNotFoundException bookingNotFoundException){

        return new ResponseEntity<>(new ErrorDto(404,"Booking not found with the given id"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(OtpExpiredException.class)
    public ResponseEntity<ErrorDto> handleOtpExpired(OtpExpiredException otpExpiredException){
        return new ResponseEntity<>(new ErrorDto(404,"The Otp expired"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<ErrorDto> handleOtpExpired(InvalidOtpException invalidOtpException){
        return new ResponseEntity<>(new ErrorDto(404,"The Otp is Invalid"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BookingCancelledException.class)
    public ResponseEntity<ErrorDto> handleOtpExpired(BookingCancelledException bookingCancelledException){
        return new ResponseEntity<>(new ErrorDto(404,"The Booking is already cancelled"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDto> handleUserNotFoundException(UserNotFoundException userNotFoundException){
        return new ResponseEntity<>(new ErrorDto(404,"User not found"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenInvalidException.class)
    public ResponseEntity<ErrorDto> tokenInvalidExceptionHandler(TokenInvalidException tokenInvalidException){
        return new ResponseEntity<>(new ErrorDto(404,"Token is invalid, Not Found"),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FeedbackAlreadyGivenException.class)
    public ResponseEntity<ErrorDto> tokenInvalidExceptionHandler(FeedbackAlreadyGivenException feedbackAlreadyGivenException){
        return new ResponseEntity<>(new ErrorDto(409,"Feedback already given"),HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ConflictBookingException.class)
    public ResponseEntity<ErrorDto> conflictBookingExceptionHandler(ConflictBookingException conflictBookingException){
        return new ResponseEntity<>(new ErrorDto(409,"Rooms Not available"),HttpStatus.CONFLICT);
    }
    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<ErrorDto> unAuthorizedUserException(UnAuthorizedException unAuthorizedException){
        return new ResponseEntity<>(new ErrorDto(403,"Unauthorized user"),HttpStatus.UNAUTHORIZED);
    }


    @ExceptionHandler(Exception.class)
    public  ResponseEntity<ErrorDto> handleGlobalError(Exception exception){
        return new ResponseEntity<>(new ErrorDto(400, exception.getMessage()),HttpStatus.BAD_REQUEST);
    }
}
