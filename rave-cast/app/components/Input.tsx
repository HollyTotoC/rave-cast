import debounce from "../utils/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Input({
    handleSearch,
    eventName,
    setEventName,
    showList,
    setShowList,
    data,
}) {
    const debouncedHandleSearch = debounce(handleSearch, 300); // 300ms de délai

    const handleChange = (e) => {
        e.preventDefault();
        setEventName(e.target.value);
        debouncedHandleSearch(e);
    };

    const handleItemClick = (title) => {
        setEventName(title);
        if (data.includes(title)) {
            setShowList(false);
        }
    };

    return (
        <>
            <form className="flex items-center justify-center w-full relative w-11/12 md:w-7/12 ">
                <input
                    type="text"
                    value={eventName}
                    placeholder="Rechercher un événement"
                    className="w-full h-12 p-4 text-black focus:outline-none"
                    onChange={handleChange}
                />
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className=" ml-[-25px] text-lime-500 cursor-pointer"
                />
                {showList && (
                    <ul className="bg-white min-w-80 max-w-90 shadow-lg max-h-60 overflow-y-auto absolute top-full">
                        {data.map((title, index) => (
                            <li
                                key={index}
                                className="border-b p-2 hover:bg-neutral-100"
                                onClick={() => handleItemClick(title)}
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    );
}

export default Input;
