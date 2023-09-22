import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Input() {
    return (
        <>
            <form className="flex items-center justify-center w-full">
                <input
                    type="text"
                    placeholder="Rechercher un événement"
                    className="w-11/12 md:w-7/12 h-12 p-4 text-black focus:outline-none"
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className=" ml-[-25px] text-lime-500 cursor-pointer"
                />
            </form>
        </>
    );
}

export default Input;
