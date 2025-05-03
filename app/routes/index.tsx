import { Book, Star } from "lucide-react";
import { Link } from "react-router";
export default function index() {
  return (
    <div className="hero min-h-[calc(100dvh_-_80px)] bg-gradient-to-b from-base-200 to-base-300">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-6xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Welcome to Blug
          </h1>
          <p className="py-6 text-lg text-base-content/80">
            Discover insightful articles, tips, and stories from our experienced
            writers. Stay updated with the latest trends and knowledge in your
            favorite topics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              viewTransition
              to={"/home"}
              className="btn btn-primary hover:btn-primary-focus transition-all duration-300 shadow-md"
            >
              <Book className="h-5 w-5 mr-2" />
              Read Articles
            </Link>
            <Link
              viewTransition
              to={"/popular"}
              className="btn btn-secondary hover:btn-secondary-focus transition-all duration-300 shadow-md"
            >
              <Star className="h-5 w-5 mr-2" />
              Popular Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
