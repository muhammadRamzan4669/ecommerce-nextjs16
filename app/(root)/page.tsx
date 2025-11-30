const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function Home() {
  await delay(2000);

  return <div>hel</div>
}
