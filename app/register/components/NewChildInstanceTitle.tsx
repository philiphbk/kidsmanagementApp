import { newChildTitle } from "@/lib/data/dummy-data"
import { BsTrash3 } from "react-icons/bs"

interface NewChildInstanceTitleInterface {
    index: number;
    remove: (index: number) => void;
    desc?: string;
}

const NewChildInstanceTitle = ({ index, remove, desc }: NewChildInstanceTitleInterface) => {
    return (
        <>
            <div className="flex gap-x-4 items-center">
                <h3>{newChildTitle[index]} {desc}</h3>

                {index > 0 && (
                    <button
                        type="button"
                        onClick={() => remove(index)} // remove a child from the list
                    >
                        <BsTrash3 className="text-hod-secondary" />
                        <span className="sr-only">Remove this child data</span>
                    </button>
                )}
            </div>

            <hr className="text-hod-text-gray2 mt-6 mb-6" />
        </>
    )
}

export default NewChildInstanceTitle