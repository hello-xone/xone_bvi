import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SettingStore = {
	settings: {
		sidebar: boolean;
	},
	actions: {
		setSideBar: (state: boolean) => void;
		switchSideBar: () => void;
	};
};

const useSettingStore = create<SettingStore>()(
	persist(
		(set, get) => ({
			settings: {
				sidebar: true,
			},
			actions: {
				setSideBar: (state: boolean) => {
					set(() => ({
						settings: {
							...get().settings,
							sidebar: state,
						}
					}));
				},
				switchSideBar: () => {
					set((state) => ({
						settings: {
							...get().settings,
							sidebar: !state.settings.sidebar
						}
					}));
				},
			},
		}),
		{
			name: 'settings', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ settings: state.settings }),
		},
	)
);

export default useSettingStore;
