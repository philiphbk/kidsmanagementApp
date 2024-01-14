import { FormHeaderType } from "@/lib/definitions/form-interfaces";

const FormHeader = ({ title, description }: FormHeaderType) => {
    return (
        <div className="form_header">
            <h2 className="text-hod-black1 text-[24px] font-medium mb-4">{title}</h2>
            <p className="text-hod-text-gray2 text-base italic">
                {description
                    ? description
                    : "(All fields are required unless specified optional)"}
            </p>
        </div>
    );
};

export default FormHeader;
