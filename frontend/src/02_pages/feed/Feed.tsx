import { Banner } from "@/03_widgets/banner/ui"
import { PopularTags } from "@/03_widgets/popular-tags/ui"
import { Container } from "@/06_shared/ui/container"

export const Feed = () => {
  return (
    <>
      <Banner />
      <Container>
        <h1>Feed</h1>
        <PopularTags />
      </Container>
    </>
  )
}
