<template>
  <q-select
    v-model="modelValue"
    :options="groupedOptions"
    :label="label"
  >
    <template #before-options>
      <q-item
        v-ripple
        v-close-popup
        clickable
        @click="modelValue = null"
      >
        <q-item-section>
          <q-item-label>Все товары и услуги</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="!modelValue"
          avatar
        >
          <q-icon
            name="check"
            color="primary"
          />
        </q-item-section>
      </q-item>
    </template>
    <template #option="scope">
      <q-item-label header>{{ scope.opt.label }}</q-item-label>
      <template
        v-for="child in scope.opt.options"
        :key="child.value"
      >
        <q-item
          v-ripple
          v-close-popup
          clickable
          @click="modelValue = child"
        >
          <q-item-section>
            <q-item-label>
              <span class="q-mr-sm">{{ child.label }}</span>
              <span class="pale-color">{{ child.count }}</span>
            </q-item-label>
          </q-item-section>
          <q-item-section
            v-if="modelValue?.value === child.value"
            avatar
          >
            <q-icon
              name="check"
              color="primary"
            />
          </q-item-section>
        </q-item>
      </template>
    </template>
    <template #selected-item="{ opt }">
      <span class="q-mr-sm">{{ (opt as ISelectOption).label }}</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import type { IGroupedSelectOption, ISelectOption } from "~/utils/types"

defineProps<{
  groupedOptions: IGroupedSelectOption[]
  label: string
}>()

const modelValue = defineModel<ISelectOption | null>()
</script>
