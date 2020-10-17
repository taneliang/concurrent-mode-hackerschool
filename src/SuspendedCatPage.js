import {
  Suspense,
  unstable_SuspenseList as SuspenseList,
  useEffect,
  useState,
} from "react";
import { Spinner } from "./Spinner";
import { createCatListResource, createCatImageResource } from "./utils/catApi";

export function SuspendedCatPage() {
  return (
    <div style={{ marginTop: "2em" }}>
      <Suspense fallback={<Spinner />}>
        <CatList />
      </Suspense>
    </div>
  );
}

const catListResource = createCatListResource();

function CatList() {
  const cats = catListResource.read();
  const [catImageResources, setCatImageResources] = useState([]);
  useEffect(() => {
    setCatImageResources(
      cats.map((cat) => ({
        cat,
        resource: createCatImageResource(cat.url),
      }))
    );
  }, [cats]);

  return (
    <SuspenseList revealOrder="forwards" tail="collapsed">
      {catImageResources.map(({ cat, resource }) => {
        resource.preload();
        return (
          <Suspense fallback={<Spinner />}>
            <CatRow key={cat.id} resource={resource} />
          </Suspense>
        );
      })}
    </SuspenseList>
  );
}

function CatRow({ resource }) {
  const imageElement = resource.read();
  return (
    <div style={{ display: "flex" }}>
      <img src={imageElement.src} alt="cat" style={{ maxHeight: 90 }} />
    </div>
  );
}
