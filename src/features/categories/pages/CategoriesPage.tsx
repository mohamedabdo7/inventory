// PersonalClosetManagement.tsx
import React, { useEffect, useMemo, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// Services
import { deviceService } from "../services/deviceService";

// Hooks
import { useClosetData, useSearch } from "../hooks";

// Types
import { Category, Product, CategoryFormData, ProductFormData, UserData } from "../types";

// Components
import { RegistrationModal } from "../components/RegistrationModal";
import { MainLayout } from "../components/MainLayout";
import { CategoriesSection } from "../components/CategoriesSection";
import { ProductsSection } from "../components/ProductsSection";
import { LoadingScreen, ErrorScreen, WelcomeScreen } from "../components/LoadingStates";
import EditProfileDialog from "../components/EditProfileDialog";
import { PackRoot } from "@/features/pack/PackRoot";

export const PersonalClosetManagement: React.FC = () => {
  // App/registration state
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [currentDeviceId, setCurrentDeviceId] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string>("");

  // Profile dialog
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Closet data (driven by userData)
  const {
    categories,
    products,
    selectedCategoryId,
    setSelectedCategoryId,
    addCategory,
    updateCategory,
    deleteCategory,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useClosetData(userData);

  const selectedCategory = useMemo(
    () => categories.find((cat) => cat.id === selectedCategoryId) || null,
    [categories, selectedCategoryId]
  );

  const categoryProducts = useMemo(
    () => (selectedCategoryId ? products[selectedCategoryId] || [] : []),
    [products, selectedCategoryId]
  );

  const { searchTerm, setSearchTerm, filteredProducts } = useSearch(categoryProducts);

  // Local forms
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<number | null>(null);

  const [categoryForm, setCategoryForm] = useState<CategoryFormData>({ name: "", icon: "👕" });
  const [productForm, setProductForm] = useState<ProductFormData>({
    name: "",
    description: "",
    size: "",
    brand: "",
    color: "",
    attachments: [],
  });

  // Initialize app
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      setLoadingError("");

      try {
        const existingDeviceId = deviceService.getDeviceId();

        if (existingDeviceId) {
          setCurrentDeviceId(existingDeviceId);
          try {
            const response = await deviceService.simulateDataFetchApi(existingDeviceId);
            setUserData(response.user);
            setIsRegistered(true);
          } catch (error) {
            console.error("Failed to fetch user data:", error);
            setLoadingError("Failed to load your data. Please try again.");
            setIsRegistered(true);
          }
        } else {
          setShowRegistrationModal(true);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        setLoadingError("Failed to initialize app. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  // Event handlers
  const handleRegistrationSuccess = (deviceId: string, newUserData: UserData) => {
    setCurrentDeviceId(deviceId);
    setUserData(newUserData);
    setIsRegistered(true);
  };

  const handleSaveProfile = (updated: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  }) => {
    if (!userData) return;
    const merged = { ...userData, ...updated };
    setUserData(merged);
    deviceService.saveUserData(merged);
  };

  // Category handlers
  const handleAddCategory = () => {
    if (categoryForm.name.trim()) {
      addCategory(categoryForm);
      setCategoryForm({ name: "", icon: "👕" });
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category.id);
    setCategoryForm({ name: category.name, icon: category.icon });
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      updateCategory(editingCategory, categoryForm);
      setEditingCategory(null);
      setCategoryForm({ name: "", icon: "👕" });
    }
  };

  const handleCancelEditCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", icon: "👕" });
  };

  const handleCancelAddCategory = () => {
    setIsAddingCategory(false);
    setCategoryForm({ name: "", icon: "👕" });
  };

  // Product handlers
  const handleAddProduct = () => {
    if (productForm.name.trim()) {
      addProduct(productForm, selectedCategoryId);
      setProductForm({
        name: "",
        description: "",
        size: "",
        brand: "",
        color: "",
        attachments: [],
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      size: product.size,
      brand: product.brand,
      color: product.color,
      attachments: product.attachments,
    });
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct, productForm, selectedCategoryId);
      setEditingProduct(null);
      setProductForm({
        name: "",
        description: "",
        size: "",
        brand: "",
        color: "",
        attachments: [],
      });
    }
  };

  const handleCancelEditProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      size: "",
      brand: "",
      color: "",
      attachments: [],
    });
  };

  const handleCancelAddProduct = () => {
    setIsAddingProduct(false);
    setProductForm({
      name: "",
      description: "",
      size: "",
      brand: "",
      color: "",
      attachments: [],
    });
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id, selectedCategoryId);
  };

  /* Loading & Error Screens */
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (loadingError && !isRegistered) {
    return <ErrorScreen message={loadingError} />;
  }

  if (!isRegistered) {
    return (
      <>
        <WelcomeScreen />
        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSuccess={handleRegistrationSuccess}
        />
      </>
    );
  }

  /* Main Layout */
  return (
    <>
      <MainLayout
        userData={userData}
        currentDeviceId={currentDeviceId}
        loadingError={loadingError}
        onEditProfile={() => setIsProfileOpen(true)}
      >
        {/* Categories Section */}
        <CategoriesSection
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          isAddingCategory={isAddingCategory}
          editingCategory={editingCategory}
          categoryForm={categoryForm}
          onSetSelectedCategory={setSelectedCategoryId}
          onStartAddingCategory={() => setIsAddingCategory(true)}
          onEditCategory={handleEditCategory}
          onSaveCategory={handleSaveCategory}
          onCancelEditCategory={handleCancelEditCategory}
          onDeleteCategory={deleteCategory}
          onCategoryFormChange={setCategoryForm}
          onAddCategory={handleAddCategory}
          onCancelAddCategory={handleCancelAddCategory}
        />

        {/* Products Section */}
        {selectedCategory && (
          <ProductsSection
            selectedCategory={selectedCategory}
            filteredProducts={filteredProducts}
            searchTerm={searchTerm}
            isAddingProduct={isAddingProduct}
            editingProduct={editingProduct}
            productForm={productForm}
            onSearchChange={setSearchTerm}
            onStartAddingProduct={() => setIsAddingProduct(true)}
            onEditProduct={handleEditProduct}
            onSaveProduct={handleSaveProduct}
            onCancelEditProduct={handleCancelEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onProductFormChange={setProductForm}
            onAddProduct={handleAddProduct}
            onCancelAddProduct={handleCancelAddProduct}
          />
        )}
      </MainLayout>

      {/* Registration modal (new users) */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSuccess={handleRegistrationSuccess}
      />

      {/* Edit profile dialog */}
      {userData && (
        <EditProfileDialog
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
          user={{
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            avatarUrl: userData.avatarUrl,
          }}
          onSave={handleSaveProfile}
        />
      )}

      {/* PackRoot - Only render if user is registered */}
      {isRegistered && userData && (
        <PackRoot
          categoryNameOf={(id) => {
            const cat = categories.find((c) => String(c.id) === String(id));
            return cat ? cat.name : "Uncategorized";
          }}
        />
      )}
    </>
  );
};

export default PersonalClosetManagement;
