const classStatus = {
    PROGRESSING: "Đang học",
}

export const getStatus = (status) => {
    switch (status) {
        case "PROGRESSING":
            return classStatus.PROGRESSING;

        default:
            return "Chưa xác định";
    }
}