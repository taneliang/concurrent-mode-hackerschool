import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { fetchCatList, fetchCatImage } from "./utils/catApi";

export function ClassicCatPage() {
  return (
    <div style={{ marginTop: "2em" }}>
      <CatList />
    </div>
  );
}

function CatList() {
  const [loading, setLoading] = useState(false);
  const [cats, setCats] = useState(null);

  useEffect(() => {
    if (!loading && !cats) {
      setLoading(true);
      fetchCatList().then((data) => {
        setCats(data);
        setLoading(false);
      });
    }
  }, [loading, cats]);

  if (loading || !cats) {
    return <Spinner />;
  }
  return cats.map((cat) => <CatRow key={cat.id} cat={cat} />);
}

function CatRow({ cat }) {
  const [loading, setLoading] = useState(false);
  const [imageElement, setImageElement] = useState(null);

  useEffect(() => {
    if (!loading && !imageElement) {
      setLoading(true);
      fetchCatImage(cat.url).then((img) => {
        setImageElement(img);
        setLoading(false);
      });
    }
  }, [loading, imageElement]);

  if (loading || !imageElement) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <div style={{ display: "flex" }}>
      <img src={imageElement.src} alt="cat" style={{ maxHeight: 90 }} />
    </div>
  );
}
