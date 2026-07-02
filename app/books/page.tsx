import CollectionPage from "@/components/CollectionPage";

export const metadata = {
  title: "Books — NITK Library",
};

export default function BooksPage() {
  return <CollectionPage kind="book" />;
}