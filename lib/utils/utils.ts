// format date to 'dd-MM-yyyy' format
export const formatDateToDMY = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// format date to 'yyyy-MM-dd' format
export const formatDateToYMD = (date: Date): string => {
    const newDate = `${date.getFullYear()}-${date.toLocaleString("default", { month: "2-digit" })}-${date.toLocaleString("default", { day: "2-digit" })}`;

    return newDate;
};

// return image in base64String format
export const convertToBase64String = (file: any) => {
    let base64Image;

    if (file) {
        console.log(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result);
            base64Image = reader.result as string;
        };
    } else {
        base64Image = "";
    }

    return base64Image;
};