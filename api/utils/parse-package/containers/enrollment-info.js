const EnrollmentInfo = function(enrollmentInfo) {
    this.classCapacity = enrollmentInfo.classCapacity;
    this.enrollmentTotal = enrollmentInfo.classTotal;
    this.availableSeats = enrollmentInfo.classAvailable;
};

export default EnrollmentInfo;