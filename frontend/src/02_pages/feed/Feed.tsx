import { PopularTags } from "@/03_widgets/popular-tags/ui"
import { Container } from "@/06_shared/ui/container"

export const Feed = () => {
  return (
    <>
      <Container>
        {/* TODO: add banner */}
        <h1>Feed</h1>
        <PopularTags />
      </Container>
    </>
  )
}
