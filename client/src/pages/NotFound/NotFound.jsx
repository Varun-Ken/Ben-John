import { Link } from "react-router-dom";
import { BsSignDeadEnd } from "react-icons/bs";

const NotFound = () => {
return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl font-bold flex items-center justify-center">
                    <BsSignDeadEnd size={60} className="m-2" />
                    Page Not Found
                </h1>
                <p className="py-6">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link to="/shop">
                    <button className="btn btn-primary">Get Back</button>
                </Link>
            </div>
        </div>
    </div>
);
};

export default NotFound;
