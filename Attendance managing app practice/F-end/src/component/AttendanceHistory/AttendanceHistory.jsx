import { formattedDate } from "@/services/date";
import styles from "./AttendanceHistory.module.scss";

export default function({data}){
    const {attendance} = data;

    const isArrEmpty = attendance.length === 0 ? true: false;

    const attendanceList = attendance.map((a) => {
        const checkInTime = formattedDate(a.checkInTime);
        const checkOutTime = formattedDate(a.checkOutTime);

        return(
            <div key={a._id} className={styles.singleRecordDiv}>
                <div className={styles.singleRecordDivFirstChild}>
                    <div>{checkInTime}</div>
                    <div>{checkOutTime}</div>
                </div>
                <hr />
            </div>
            
        )
    });

    return(
        <div className={styles.attendanceHistorMainDiv}>
            <div className={styles.pageHeading}>
                <span>Attendance History</span>
            </div>

            <br />
            {isArrEmpty ?
                <div style={{
                    fontSize:"20px",
                    color:"red"
                }}>
                    No record found
                </div>

               : <div className={styles.attendanceListParent}>
                    <div className={styles.checkinCheckoutHeading}>
                        <div>Check-In</div>
                        <div>Check-Out</div>
                    </div>

                    <br /> 
                    {attendanceList}
                </div>
            }
        </div>
    )
}