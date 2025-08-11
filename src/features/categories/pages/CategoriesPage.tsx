import { useState, useEffect } from "react";
import { Plus, Package, Edit3, Trash2, Search, Upload, X, Save, Eye } from "lucide-react";

// Mock data for demonstration
const initialCategories = [
  { id: 1, name: "Medications", icon: "💊", productCount: 12 },
  { id: 2, name: "Medical Devices", icon: "🩺", productCount: 8 },
  { id: 3, name: "Surgical Tools", icon: "⚕️", productCount: 15 },
];

const initialProducts = {
  1: [
    {
      id: 1,
      name: "Paracetamol 500mg",
      description: "Pain relief medication",
      weight: "0.5g",
      attachments: ["pill-image.jpg"],
      categoryId: 1,
    },
    {
      id: 2,
      name: "Amoxicillin",
      description: "Antibiotic medication",
      weight: "250mg",
      attachments: ["antibiotic.jpg"],
      categoryId: 1,
    },
    {
      id: 5,
      name: "Ibuprofen 400mg",
      description: "Anti-inflammatory medication",
      weight: "400mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 6,
      name: "Aspirin 325mg",
      description: "Blood thinner and pain relief",
      weight: "325mg",
      attachments: ["aspirin.jpg"],
      categoryId: 1,
    },
    {
      id: 7,
      name: "Metformin",
      description: "Diabetes medication",
      weight: "500mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 8,
      name: "Lisinopril",
      description: "Blood pressure medication",
      weight: "10mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 9,
      name: "Omeprazole",
      description: "Acid reflux medication",
      weight: "20mg",
      attachments: ["omeprazole.jpg"],
      categoryId: 1,
    },
    {
      id: 10,
      name: "Atorvastatin",
      description: "Cholesterol medication",
      weight: "40mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 11,
      name: "Levothyroxine",
      description: "Thyroid hormone replacement",
      weight: "50mcg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 12,
      name: "Amlodipine",
      description: "Calcium channel blocker",
      weight: "5mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 13,
      name: "Metoprolol",
      description: "Beta-blocker for heart conditions",
      weight: "50mg",
      attachments: [],
      categoryId: 1,
    },
    {
      id: 14,
      name: "Prednisone",
      description: "Anti-inflammatory steroid",
      weight: "10mg",
      attachments: ["prednisone.jpg"],
      categoryId: 1,
    },
  ],
  2: [
    {
      id: 15,
      name: "Digital Thermometer",
      description: "High precision thermometer",
      weight: "50g",
      attachments: ["thermometer.jpg"],
      categoryId: 2,
    },
    {
      id: 16,
      name: "Blood Pressure Monitor",
      description: "Digital BP monitor with memory",
      weight: "800g",
      attachments: ["bp-monitor.jpg"],
      categoryId: 2,
    },
    {
      id: 17,
      name: "Pulse Oximeter",
      description: "Finger pulse and oxygen monitor",
      weight: "60g",
      attachments: [],
      categoryId: 2,
    },
    {
      id: 18,
      name: "ECG Machine",
      description: "12-lead electrocardiogram device",
      weight: "2.5kg",
      attachments: ["ecg.jpg"],
      categoryId: 2,
    },
    {
      id: 19,
      name: "Otoscope",
      description: "Ear examination tool",
      weight: "200g",
      attachments: [],
      categoryId: 2,
    },
    {
      id: 20,
      name: "Ophthalmoscope",
      description: "Eye examination instrument",
      weight: "180g",
      attachments: ["ophthalmoscope.jpg"],
      categoryId: 2,
    },
    {
      id: 21,
      name: "Nebulizer",
      description: "Respiratory medication delivery device",
      weight: "1.2kg",
      attachments: [],
      categoryId: 2,
    },
    {
      id: 22,
      name: "Defibrillator",
      description: "Automated external defibrillator",
      weight: "2.8kg",
      attachments: ["aed.jpg"],
      categoryId: 2,
    },
  ],
  3: [
    {
      id: 23,
      name: "Surgical Scissors",
      description: "Sterile surgical scissors",
      weight: "120g",
      attachments: ["scissors.jpg"],
      categoryId: 3,
    },
    {
      id: 24,
      name: "Scalpel Set",
      description: "Disposable surgical scalpels",
      weight: "15g each",
      attachments: ["scalpel.jpg"],
      categoryId: 3,
    },
    {
      id: 25,
      name: "Forceps",
      description: "Surgical grasping instrument",
      weight: "80g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 26,
      name: "Hemostats",
      description: "Blood vessel clamps",
      weight: "65g",
      attachments: ["hemostats.jpg"],
      categoryId: 3,
    },
    {
      id: 27,
      name: "Retractors",
      description: "Surgical tissue retractors",
      weight: "150g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 28,
      name: "Needle Holders",
      description: "Surgical needle holding instruments",
      weight: "90g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 29,
      name: "Surgical Clamps",
      description: "Various surgical clamps",
      weight: "110g",
      attachments: ["clamps.jpg"],
      categoryId: 3,
    },
    {
      id: 30,
      name: "Bone Saw",
      description: "Orthopedic bone cutting saw",
      weight: "400g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 31,
      name: "Surgical Drill",
      description: "Battery-powered surgical drill",
      weight: "800g",
      attachments: ["drill.jpg"],
      categoryId: 3,
    },
    {
      id: 32,
      name: "Electrocautery Unit",
      description: "Surgical cauterization device",
      weight: "1.5kg",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 33,
      name: "Suction Device",
      description: "Surgical suction apparatus",
      weight: "2.2kg",
      attachments: ["suction.jpg"],
      categoryId: 3,
    },
    {
      id: 34,
      name: "Surgical Headlamp",
      description: "LED surgical headlight",
      weight: "300g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 35,
      name: "Laparoscopic Tools",
      description: "Minimally invasive surgery tools",
      weight: "200g",
      attachments: ["laparoscopic.jpg"],
      categoryId: 3,
    },
    {
      id: 36,
      name: "Surgical Stapler",
      description: "Automatic tissue stapling device",
      weight: "350g",
      attachments: [],
      categoryId: 3,
    },
    {
      id: 37,
      name: "Bone Curettes",
      description: "Bone scraping instruments",
      weight: "75g",
      attachments: ["curettes.jpg"],
      categoryId: 3,
    },
  ],
};

const commonIcons = ["💊", "🩺", "⚕️", "🏥", "💉", "🧪", "🩹", "🫀", "🦷", "👁️"];

function MedicalInventoryManagement() {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [categoryForm, setCategoryForm] = useState({ name: "", icon: "💊" });
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    weight: "",
    attachments: [],
  });

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);
  const categoryProducts = products[selectedCategoryId] || [];
  const filteredProducts = categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = () => {
    if (categoryForm.name.trim()) {
      const newCategory = {
        id: Date.now(),
        name: categoryForm.name,
        icon: categoryForm.icon,
        productCount: 0,
      };
      setCategories([...categories, newCategory]);
      setProducts({ ...products, [newCategory.id]: [] });
      setCategoryForm({ name: "", icon: "💊" });
      setIsAddingCategory(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setCategoryForm({ name: category.name, icon: category.icon });
  };

  const handleSaveCategory = () => {
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory
          ? { ...cat, name: categoryForm.name, icon: categoryForm.icon }
          : cat
      )
    );
    setEditingCategory(null);
    setCategoryForm({ name: "", icon: "💊" });
  };

  const handleDeleteCategory = (categoryId: any) => {
    setCategories(categories.filter((cat) => cat.id !== categoryId));
    const newProducts = { ...products };
    delete newProducts[categoryId];
    setProducts(newProducts);
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(categories.find((cat) => cat.id !== categoryId)?.id || null);
    }
  };

  const handleAddProduct = () => {
    if (productForm.name.trim()) {
      const newProduct = {
        id: Date.now(),
        ...productForm,
        categoryId: selectedCategoryId,
      };

      const updatedProducts = {
        ...products,
        [selectedCategoryId]: [...(products[selectedCategoryId] || []), newProduct],
      };
      setProducts(updatedProducts);

      // Update category product count
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategoryId ? { ...cat, productCount: cat.productCount + 1 } : cat
        )
      );

      setProductForm({ name: "", description: "", weight: "", attachments: [] });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      weight: product.weight,
      attachments: product.attachments,
    });
  };

  const handleSaveProduct = () => {
    const updatedProducts = {
      ...products,
      [selectedCategoryId]: products[selectedCategoryId].map((product) =>
        product.id === editingProduct ? { ...product, ...productForm } : product
      ),
    };
    setProducts(updatedProducts);
    setEditingProduct(null);
    setProductForm({ name: "", description: "", weight: "", attachments: [] });
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = {
      ...products,
      [selectedCategoryId]: products[selectedCategoryId].filter((p) => p.id !== productId),
    };
    setProducts(updatedProducts);

    // Update category product count
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategoryId
          ? { ...cat, productCount: Math.max(0, cat.productCount - 1) }
          : cat
      )
    );
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
    setProductForm({
      ...productForm,
      attachments: [...productForm.attachments, ...fileNames],
    });
  };

  const removeAttachment = (index) => {
    const newAttachments = productForm.attachments.filter((_, i) => i !== index);
    setProductForm({ ...productForm, attachments: newAttachments });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Medical Inventory Management</h1>
          <p className="text-gray-600">Manage your medical categories and products efficiently</p>
        </div>

        {/* Categories Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center text-xl font-semibold text-gray-800">
              <Package className="mr-2" size={24} />
              Categories
            </h2>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Add Category
            </button>
          </div>

          {/* Categories List */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                  selectedCategoryId === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {editingCategory === category.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Category name"
                    />
                    <div className="flex flex-wrap gap-1">
                      {commonIcons.map((icon) => (
                        <button
                          key={icon}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCategoryForm({ ...categoryForm, icon });
                          }}
                          className={`h-8 w-8 rounded text-lg hover:bg-gray-100 ${
                            categoryForm.icon === icon ? "bg-blue-100" : ""
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveCategory();
                        }}
                        className="flex-1 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
                      >
                        <Save size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCategory(null);
                        }}
                        className="flex-1 rounded bg-gray-600 px-2 py-1 text-sm text-white hover:bg-gray-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 text-center">
                      <div className="mb-2 text-3xl">{category.icon}</div>
                      <h3 className="font-medium text-gray-800">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.productCount} products</p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCategory(category);
                        }}
                        className="rounded p-1 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this category?")) {
                            handleDeleteCategory(category.id);
                          }
                        }}
                        className="rounded p-1 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Add Category Card */}
            {isAddingCategory && (
              <div className="rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    placeholder="Category name *"
                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mb-2 text-sm text-gray-600">Choose an icon:</div>
                  <div className="flex flex-wrap gap-1">
                    {commonIcons.map((icon) => (
                      <button
                        key={icon}
                        onClick={() => setCategoryForm({ ...categoryForm, icon })}
                        className={`h-8 w-8 rounded text-lg hover:bg-white ${
                          categoryForm.icon === icon ? "bg-white shadow" : ""
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddCategory}
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setIsAddingCategory(false);
                        setCategoryForm({ name: "", icon: "💊" });
                      }}
                      className="flex-1 rounded-lg bg-gray-300 py-2 text-gray-700 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products Section */}
        {selectedCategory && (
          <div className="rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <span className="mr-2 text-2xl">{selectedCategory.icon}</span>
                {selectedCategory.name} Products
              </h2>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
              >
                <Plus size={20} className="mr-2" />
                Add Product
              </button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Product Form */}
            {isAddingProduct && (
              <div className="mb-6 rounded-lg bg-gray-50 p-4">
                <h3 className="mb-4 text-lg font-medium">Add New Product</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Weight</label>
                    <input
                      type="text"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 500mg, 1kg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm({ ...productForm, description: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Attachments (Images/Videos)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 hover:bg-gray-200">
                        <Upload size={16} className="mr-2" />
                        Upload Files
                        <input
                          type="file"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-sm text-gray-500">
                        {productForm.attachments.length} file(s) selected
                      </span>
                    </div>
                    {productForm.attachments.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {productForm.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center rounded bg-blue-100 px-2 py-1"
                          >
                            <span className="text-sm">{file}</span>
                            <button
                              onClick={() => removeAttachment(index)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={handleAddProduct}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Add Product
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingProduct(false);
                      setProductForm({ name: "", description: "", weight: "", attachments: [] });
                    }}
                    className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
                >
                  {editingProduct === product.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product name *"
                      />
                      <textarea
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({ ...productForm, description: e.target.value })
                        }
                        className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        rows="2"
                      />
                      <input
                        type="text"
                        value={productForm.weight}
                        onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                        className="w-full rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Weight"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProduct}
                          className="flex-1 rounded bg-green-600 px-2 py-1 text-sm text-white hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="flex-1 rounded bg-gray-600 px-2 py-1 text-sm text-white hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <h3 className="mb-1 font-medium text-gray-800">{product.name}</h3>
                        <p className="mb-2 text-sm text-gray-600">{product.description}</p>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Weight:</span> {product.weight}
                        </div>
                        {product.attachments.length > 0 && (
                          <div className="mt-1 text-sm text-gray-500">
                            <span className="font-medium">Files:</span> {product.attachments.length}{" "}
                            attachment(s)
                          </div>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="rounded p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this product?")) {
                              handleDeleteProduct(product.id);
                            }
                          }}
                          className="rounded p-2 text-gray-600 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <div className="mb-4 text-gray-400">
                  <Package size={48} className="mx-auto" />
                </div>
                <p className="text-gray-500">
                  {searchTerm
                    ? "No products found matching your search."
                    : "No products in this category yet."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalInventoryManagement;
