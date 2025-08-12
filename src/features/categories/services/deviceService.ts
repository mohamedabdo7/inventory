// services/deviceService.ts
import { UserData, RegistrationFormData } from "../types";

export const deviceService = {
  generateDeviceId: (email: string): string => {
    const timestamp = Date.now() * 1000;
    return `${timestamp}_${email}`;
  },

  saveDeviceId: (deviceId: string): void => {
    try {
      localStorage.setItem("deviceId", deviceId);
    } catch (error) {
      console.error("Failed to save device ID:", error);
    }
  },

  getDeviceId: (): string | null => {
    try {
      return localStorage.getItem("deviceId");
    } catch (error) {
      console.error("Failed to get device ID:", error);
      return null;
    }
  },

  saveUserData: (userData: UserData): void => {
    try {
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  },

  getUserData: (): UserData | null => {
    try {
      const data = localStorage.getItem("userData");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Failed to get user data:", error);
      return null;
    }
  },

  simulateRegistrationApi: async (
    data: RegistrationFormData
    // deviceId: string
  ): Promise<{ user: UserData }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;

        if (success) {
          const userData: UserData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            categories: [
              { id: 1, name: "Shirts", icon: "👕", productCount: 2 },
              { id: 2, name: "Pants", icon: "👖", productCount: 1 },
              { id: 3, name: "Shoes", icon: "👟", productCount: 0 },
              { id: 4, name: "Accessories", icon: "👜", productCount: 0 },
            ],
            products: {
              1: [
                {
                  categoryId: 1,
                  id: 1,
                  name: "White Cotton T-Shirt",
                  description: "Basic white tee",
                  size: "M",
                  brand: "Nike",
                  color: "White",
                  attachments: ["/images/product1.png"],
                },
                {
                  categoryId: 1,
                  id: 2,
                  name: "Blue Dress Shirt",
                  description: "Formal blue shirt",
                  size: "L",
                  brand: "Calvin Klein",
                  color: "Blue",
                  attachments: ["/images/product1.png"],
                },
              ],
              2: [
                {
                  categoryId: 2,
                  id: 3,
                  name: "Blue Jeans",
                  description: "Classic denim jeans",
                  size: "32W x 30L",
                  brand: "Levi's",
                  color: "Blue",
                  attachments: [],
                },
              ],
              3: [],
              4: [],
            },
          };

          resolve({ user: userData });
        } else {
          reject(new Error("Registration failed. Please try again."));
        }
      }, 2000);
    });
  },

  simulateDataFetchApi: async (deviceId: string): Promise<{ user: UserData }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.05;

        if (success) {
          const cachedData = deviceService.getUserData();

          const userData: UserData = cachedData || {
            name: "Returning User",
            email: deviceId.split("_")[1] || "user@example.com",
            phone: "+1234567890",
            categories: [
              { id: 1, name: "Shirts", icon: "👕", productCount: 1 },
              { id: 2, name: "Pants", icon: "👖", productCount: 1 },
              { id: 3, name: "Shoes", icon: "👟", productCount: 0 },
            ],
            products: {
              1: [
                {
                  id: 1,
                  name: "My Favorite Shirt",
                  description: "A well-loved shirt",
                  size: "M",
                  brand: "Brand",
                  color: "Blue",
                  attachments: [],
                },
              ],
              2: [
                {
                  id: 2,
                  name: "Comfortable Jeans",
                  description: "Go-to jeans",
                  size: "32",
                  brand: "Brand",
                  color: "Dark Blue",
                  attachments: [],
                },
              ],
              3: [],
            },
          };

          resolve({ user: userData });
        } else {
          reject(new Error("Failed to fetch user data"));
        }
      }, 1000);
    });
  },
};
