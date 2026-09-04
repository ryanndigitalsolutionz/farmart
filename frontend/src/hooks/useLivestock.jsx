import { useLivestockContext } from "../context/LivestockContext";

const useLivestock = () => {
    return useLivestockContext();
};

export default useLivestock;