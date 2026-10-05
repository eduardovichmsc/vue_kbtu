import { reactive } from "vue";
import dbData from "../data/db.json";

export const spacesStore = reactive({
  spaces: dbData.spaces,
  activeSpaceId: dbData.spaces[0].id,

  get activeSpace() {
    return (
      this.spaces.find((s) => s.id === this.activeSpaceId) || this.spaces[0]
    );
  },

  setActiveSpace(id) {
    this.activeSpaceId = id;
  },
});
