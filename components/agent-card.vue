<template>
  <div
    v-if="device.isMobileOrTablet"
    class="card-mobile"
  >
    <div class="card-mobile__info">
      <img
        :src="`/agent-avatars/${agentInfo.avatar}`"
        :alt="agentInfo.firstName + ' ' + agentInfo.lastName"
      />
      <div class="card-mobile__stats">
        <div class="card-mobile__name subtitle">
          {{ agentInfo.firstName + " " + agentInfo.lastName }}
        </div>
        <feedback-statistics
          class="card-mobile__statistics"
          :premium="agentInfo.premium"
          :rate="agentInfo.rate"
          :review-count="agentInfo.reviewCount"
        />
      </div>
    </div>
    <div class="card-mobile__description ellipsis-3-lines">
      {{ agentInfo.description }}
    </div>
  </div>
  <div
    v-else
    class="card"
  >
    <div class="card__img">
      <img
        :src="`/agent-avatars/${agentInfo.avatar}`"
        :alt="agentInfo.firstName + ' ' + agentInfo.lastName"
      />
    </div>
    <div class="card__info">
      <div class="card__name subtitle-large">
        {{ agentInfo.firstName + " " + agentInfo.lastName }}
      </div>
      <feedback-statistics
        class="card__statistics"
        :premium="agentInfo.premium"
        :rate="agentInfo.rate"
        :review-count="agentInfo.reviewCount"
      />
      <div class="card__description ellipsis-3-lines">
        {{ agentInfo.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IAgentInfo } from "~/utils/types"

defineProps<{
  agentInfo: IAgentInfo
}>()

const device = useDevice()
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: stretch;
  width: 100%;
  max-width: 45rem;
  height: 12rem;
  padding: 1.5rem;
  background-color: var(--q-footer);
  border-radius: 1.3rem;

  &__img {
    img {
      width: 9rem;
      height: 9rem;
      object-fit: cover;
      border-radius: 1.3rem;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding-left: 1.5rem;
  }

  &__description {
    line-height: 1.6rem;
  }
}

.card-mobile {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--q-footer);
  border-radius: 1.3rem;

  &__info {
    display: flex;

    img {
      width: 3rem;
      height: 3rem;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    padding-left: 0.5rem;
  }

  &__description {
    padding: 1rem 0 2rem;
    line-height: 1.8rem;
  }
}

@media screen and (width <= 610px) {
  .card {
    padding: 0.5rem;

    &__img {
      img {
        width: 3rem;
        height: 3rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }

    &__info {
      padding-left: 0.5rem;
    }
  }
}

@media screen and (width >= 610px) {
  .card-mobile {
    width: 100%;
    max-width: 45rem;
    padding: 1.5rem;

    &__img {
      img {
        width: 3rem;
        height: 3rem;
        object-fit: cover;
        border-radius: 0.5rem;
      }
    }

    &__stats {
      padding-left: 1.5rem;
    }
  }
}
</style>
