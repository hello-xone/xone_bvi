import { create } from "zustand";

type ReleaseStore = {
	releaseState: any;
	actions: {
		setReleaseState: (state: any) => void;
	};
};

const useReleaseStore = create<ReleaseStore>()(
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
);

export default useReleaseStore;
