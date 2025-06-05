// app/page.jsx
export default function HomePage() {
  const fetchPosts = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/`);
  };
  return (
    <div className="container">
      <div class="row">
        <div class="col-7"></div>
      </div>
    </div>
  );
}
