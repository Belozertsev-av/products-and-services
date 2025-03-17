<template>
  <div class="about">
    <div
      v-if="device.isMobileOrTablet"
      class="about__company-info"
    >
      <company-info
        hide-phone
        :company-info="company"
      />
    </div>
    <div class="about__description">
      <div class="about__title subtitle-large">О компании</div>
      <div class="about__desc">{{ companyAdditionalInfo.description }}</div>
    </div>
    <div
      class="about__schedule-info"
      @click="isScheduleOpened = !isScheduleOpened"
    >
      <div class="about__title subtitle-large">
        <span>Режим работы</span>
        <custom-icon
          class="about__icon"
          :class="{ 'arrow-flip': isScheduleOpened }"
          icon="keyboard-arrow-down"
          size="1.8rem"
        />
      </div>
      <div class="about__today-schedule">{{ todaySchedule }}</div>
      <transition
        name="fade"
        mode="out-in"
      >
        <div
          v-show="isScheduleOpened"
          class="about__detailed-schedule"
        >
          <ul class="about__days">
            <li
              v-for="(
                [startsAt, endsAt], day
              ) in companyAdditionalInfo.schedule"
              :key="day"
              class="about__day"
            >
              <span>{{ Days[day] }}:</span>
              <span>с {{ startsAt }} до {{ endsAt }}</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="about__location-info">
      <div class="about__info">
        <div class="about__title subtitle-large">Местоположение</div>
        <div class="about__location subtitle-small">
          {{ companyAdditionalInfo.address }}
        </div>
      </div>
      <div
        class="about__map"
        :class="{ 'fullscreen-map': isMapMaximized }"
        @click="isMapMaximized = !isMapMaximized"
      >
        <yandex-map
          v-model="map"
          :settings="{
            location: {
              center: companyAdditionalInfo.coordinates,
              zoom: 15,
            },
          }"
          width="100%"
          height="100%"
        >
          <yandex-map-default-scheme-layer />
          <yandex-map-default-features-layer />
          <yandex-map-default-marker
            :settings="{ coordinates: companyAdditionalInfo.coordinates }"
          />
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICompanyAdditionalInfo, ICompanyInfo } from "~/utils/types"

import { shallowRef } from "vue"
import type { YMap } from "@yandex/ymaps3-types"
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
} from "vue-yandex-maps"

const company = ref<ICompanyInfo>({
  id: 1,
  name: "Наследие",
  phoneNumber: "+7 (951) 669-21-54",
  img: "company_logo.webp",
  agentsCount: 6,
  premium: true,
  rate: 4.7,
  reviewCount: 19,
})

const companyAdditionalInfo = ref<ICompanyAdditionalInfo>({
  description:
    "Копкой занимаемся 15 лет. Всеначалось с хобби и плавно переросло в любимую работу. Работаем с профессиональной техникой.",
  address: "Ростов на Дону, Воронежская ул., 42А корп. 1",
  coordinates: [39.668408, 47.244099],
  schedule: {
    mon: ["09:00", "21:00"],
    tue: ["09:00", "21:00"],
    wed: ["09:00", "21:00"],
    thu: ["09:00", "21:00"],
    fri: ["09:00", "21:00"],
    sat: ["12:00", "20:00"],
    sun: ["12:00", "20:00"],
  },
})

const device = useDevice()

const isScheduleOpened = ref<boolean>(false)
const isMapMaximized = ref<boolean>(false)
const map = shallowRef<null | YMap>(null)

const todaySchedule = computed(() => {
  return "Сегодня с 12:00 до 20:00"
})
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  max-width: 48rem;
  margin: 2rem auto;

  &__company-info {
    margin-bottom: 2rem;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__icon {
    cursor: pointer;
    transition: 0.2s;
  }

  &__description,
  &__schedule-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 1.5rem;
  }

  &__schedule-info {
    color: var(--font-label-color);
    cursor: pointer;
    background-color: var(--q-footer);
    border-radius: 1.3rem;
  }

  &__detailed-schedule {
    margin: 2rem 0 1rem;
  }

  &__days {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__day {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;

    &:first-child {
      text-align: end;
    }

    span:last-child {
      text-align: start;
    }
  }

  &__location-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 1.5rem;
  }

  &__map {
    width: 15rem;
    height: 10rem;
    overflow: hidden;
    cursor: pointer;
    border-radius: 1.3rem;
  }

  &__info {
    gap: 1rem;
  }
}

.arrow-flip {
  transform: rotate(180deg);
}

.fullscreen-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media screen and (width <= 540px) {
  .about {
    &__location-info {
      flex-direction: column-reverse;
      gap: 1rem;
      align-items: flex-start;
      padding: 0;
    }

    &__description {
      padding: 0;
    }

    &__map {
      width: 100%;
    }
  }
}
</style>
