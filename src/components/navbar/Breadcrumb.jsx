import { MdKeyboardArrowRight } from "react-icons/md";
import { generateBreadcrumbs } from "../../utils/Helper";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    // console.log(breadcrumbs, "breadcrumbs")
    return (
        <ol className="flex items-center whitespace-nowrap">


            {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                    <Link
                        to={crumb.path}
                        className="flex items-center  font-semibold text-gray-500 hover:text-[var(--defaultBlue)] capitalize"
                    >
                        {crumb.label}
                    </Link>
                    {index < breadcrumbs.length - 1 && (
                        <MdKeyboardArrowRight className="text-gray-400" size={20} />
                    )}
                </li>
            ))}
        </ol>

    )
}

export default Breadcrumb