import Image from "next/image";
import Link from "next/link";

type PostType = {
  id: string;
  title: string;
  content: string;
  mainImage: string;
  author?: string;
  createdAt: Date;
  truncatedText: string;
};

const Post = (props: PostType) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-full justify-center">
        <div className="sm:w-1/3 md:w-48">
          <Link href={`/news/${props.id}`}>
            <Image
              width={200}
              height={200}
              src={props.mainImage}
              alt={props.title}
              className="w-full h-auto hidden sm:block flex-1"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-4 items-start w-full md:w-2/3">
          <Link href={`/news/${props.id}`}>
            <h1 className="text-xl font-semibold">{props.title}</h1>
          </Link>
          <section className="flex gap-6 items-center">
            {props.author ? (
              <p>
                <span className="text-sm text-slate-500 mr-1">Автор:</span>
                <span className="font-semibold text-md">{props.author}</span>
              </p>
            ) : (
              ""
            )}
            <span className="text-slate-500 text-sm">
              {props.createdAt.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </section>
          <p className="text-sm text-slate-500">
            {props.truncatedText ? props.truncatedText : props.content}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default Post;
