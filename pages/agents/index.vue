<template>
  <div class="agents">
    <agent-card
      v-for="agent in agents"
      :key="agent.id"
      :agent-info="agent"
      class="products__card"
    />
  </div>
</template>

<script setup lang="ts">
import AgentCard from "~/components/agent-card.vue"
import type { IAgentInfo } from "~/utils/types"

const agents = ref<IAgentInfo[]>([
  {
    id: 1,
    firstName: "Дмитрий",
    lastName: "Хитрый",
    avatar: "Img-1.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: 4.3,
    reviewCount: 19,
    premium: true,
  },
  {
    id: 2,
    firstName: "Апполинарий",
    lastName: "Землеперекопский",
    avatar: "Img-2.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: null,
    reviewCount: null,
    premium: true,
  },
  {
    id: 3,
    firstName: "Федор",
    lastName: "Сумкин",
    avatar: "Img-3.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: 5,
    reviewCount: 22,
    premium: false,
  },
  {
    id: 4,
    firstName: "Василий",
    lastName: "Копушин",
    avatar: "Img-4.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: 4,
    reviewCount: 123,
    premium: true,
  },
  {
    id: 5,
    firstName: "Феофан",
    lastName: "Кусакин",
    avatar: "Img-5.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: 3.5,
    reviewCount: 3,
    premium: false,
  },
  {
    id: 6,
    firstName: "Василиса",
    lastName: "Землеперекопская",
    avatar: "Img-6.webp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos eum illo porro, quod quos sapiente similique soluta ut veniam veritatis? Aliquid autem cupiditate, delectus dignissimos dolorum facere iste natus necessitatibus odio officiis sit tenetur, ut vel. Distinctio dolores nobis voluptas!",
    rate: 4.9,
    reviewCount: 8,
    premium: true,
  },
])
</script>

<style lang="scss" scoped>
.agents {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin: 2rem 0 4rem;
}

@media screen and (width <= 769px) {
  .agents {
    margin: 1rem 0 2rem;
  }
}

@media screen and (width <= 478px) {
  .agents {
    margin: 1rem 0;
  }
}
</style>
