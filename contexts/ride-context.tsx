import { useAuth } from "@/hooks/use-auth";
import { useError } from "@/hooks/use-error";
import { UserRole } from "@/models/enums";
import { Ride } from "@/models/ride";
import { CreateRideData, rideService } from "@/services/ride-service";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface RideContextData {
  rides: Ride[];
  loading: boolean;
  createRide: (data: CreateRideData) => Promise<Ride | undefined>;
  updateRide: (id: string, ride: Partial<Ride>) => Promise<void>;
  getRideById: (id: string) => Promise<Ride | null>;
  fetchRides: () => Promise<void>;
}

export const RideContext = createContext<RideContextData>({} as RideContextData);

export const RideProvider = ({ children }: { children: ReactNode }) => {
  const { handleError } = useError();
  const { userProfile } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRides = useCallback(async () => {
    try {
      if (!userProfile) return;
      setLoading(true);
      let data: Ride[] = [];
      if (userProfile.role === UserRole.CUSTOMER) {
        data = await rideService.getCustomerRides(userProfile.id);
      } else if (userProfile.role === UserRole.DELIVERER) {
        data = await rideService.getDelivererRides(userProfile.id);
      }
      setRides(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [handleError, userProfile]);

  useEffect(() => {
    fetchRides();
  }, [fetchRides]);

  const createRide = async (data: CreateRideData) => {
    setLoading(true);
    try {
      const newRide = await rideService.createRide(data);
      await fetchRides();
      return newRide;
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRide = async (id: string, ride: Partial<Ride>) => {
    try {
      await rideService.updateRide(id, ride);
      await fetchRides();
    } catch (error) {
      handleError(error);
    }
  };

  const getRideById = async (id: string) => {
    try {
      return await rideService.getRideById(id);
    } catch (error) {
      handleError(error);
      return null;
    }
  };

  return (
    <RideContext.Provider
      value={{
        rides,
        loading,
        createRide,
        updateRide,
        getRideById,
        fetchRides,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};
