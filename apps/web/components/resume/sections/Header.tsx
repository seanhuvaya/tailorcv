import type {Resume} from "@/lib/resume/schema";
import {MdOutlineAlternateEmail} from "react-icons/md";
import {FaGithub, FaInternetExplorer, FaLinkedin, FaPhoneAlt} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";

export default function Header({data}: { data: Resume["header"] }) {
    return (
        <header>
            <div className="grid grid-cols-4 items-start w-full mb-1">
                <h1 className="text-2xl text-center col-span-3 font-lato font-bold">
                    {data.name}
                </h1>

                <div className="text-xs">
                    <p className="flex items-center gap-1">
                        <span className="text-xs text-red-500">
                            <FaLocationDot/>
                        </span>
                        {data.location}
                    </p>
                    {data.relocation && <p>({data.relocation})</p>}
                </div>
            </div>
            <ul className="flex justify-between text-sm">
                <li className="flex items-center gap-1">
                    <span className="text-xs text-blue-500">
                        <MdOutlineAlternateEmail/>
                    </span>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </li>
                <li className="flex items-center gap-1">
                    <span className="text-xs text-blue-500">
                        <FaPhoneAlt/>
                    </span>
                    <a href={`tel:${data.phone}`}>{data.phone}</a>
                </li>
                <li className="flex items-center gap-1">
                    <span className="text-xs text-blue-500">
                        <FaLinkedin/>
                    </span>
                    <a href={data.linkedin}>{data.linkedin?.replace("https://linkedin.com/in/", "")}</a>
                </li>
                <li className="flex items-center gap-1">
                    <span className="text-xs text-blue-500">
                        <FaGithub/>
                    </span>
                    <a href={data.github}>{data.github?.replace("https://github.com/", "")}</a>
                </li>
                <li className="flex items-center gap-1">
                    <span className="text-xs text-blue-500">
                        <FaInternetExplorer/>
                    </span>
                    <a href={data.website}>{data.website?.replace("https://", "")}</a>
                </li>
            </ul>
        </header>
    );
}
