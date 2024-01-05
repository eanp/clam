export const response = (res, result, status, message, pagination) => {
    const resultPrint = {};
    resultPrint.status = "success";
    resultPrint.statusCode = status;
    resultPrint.data = result;
    resultPrint.message = message || null;
    resultPrint.pagination = pagination || null;
    res.status(status).json(resultPrint);
};

export const timeConverter = (timestamp) => {
    var a = new Date(timestamp);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
};
