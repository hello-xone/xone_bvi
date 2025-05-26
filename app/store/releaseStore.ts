import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReleaseStore = {
	releaseState: any;
	actions: {
		setReleaseState: (state: any) => void;
	};
};

const useReleaseStore = create<ReleaseStore>()(
	persist(
		(set) => ({
			releaseState: {},
			actions: {
				setReleaseState: (state: any) => {
					set(() => ({
						releaseState: state,
					}));
				},
			},
		}),
		{
			name: "releaseStore", // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage),
		},
	),
);

export default useReleaseStore;
