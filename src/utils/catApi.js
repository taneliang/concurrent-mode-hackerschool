export function fetchCatList() {
  return fetch("https://api.thecatapi.com/v1/images/search?limit=10", {
    headers: new Headers({
      "Content-Type": "application/json",
      "x-api-key": "a2e7d97b-708b-48d2-a015-26dcc80a8a7a",
    }),
  }).then((res) => res.json());
}

export async function fetchCatImage(url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.src = url;
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", () =>
      reject(new Error(`Failed to load image ${url}`))
    );
  });
}
