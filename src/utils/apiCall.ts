import api from "./axios";

interface ApiOptions {
  [key: string]: any;
}

interface QueryParams {
  [key: string]: string | number | boolean | null | undefined;
}

interface FileUploadData {
  file: File;
  fieldName?: string;
  additionalData?: Record<string, any>;
}

const makeApiCall = async (
  method: string,
  url: string,
  data: any = null,
  query: QueryParams = {},
  options: ApiOptions = {}
): Promise<any> => {
  let finalUrl = url;
  if (query) {
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );

    const searchParams = new URLSearchParams(filteredQuery as Record<string, string>);
    const queryString = searchParams.toString();
    if (queryString) {
      finalUrl = `${url}${url.includes("?") ? "&" : "?"}${queryString}`;
    }
  }

  const requestConfig: ApiOptions = {
    method: method.toLowerCase(),
    url: finalUrl,
    ...options,
  };

  if (data) {
    if (["post", "put", "patch", "delete"].includes(method.toLowerCase())) {
      requestConfig.data = data;
    } else if (method.toLowerCase() === "get") {
      requestConfig.params = data;
    }
  }

  const response = await api(requestConfig);
  return response.data;
};

export const apiUploadFile = async (
  url: string,
  file: File,
  options: ApiOptions = {}
): Promise<any> => {
  const formData = new FormData();

  formData.append("image", file);

  const uploadOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...options,
  };

  return makeApiCall("post", url, formData, {}, uploadOptions);
};

export const apiUploadFiles = async (
  url: string,
  uploadData: FileUploadData[], // Explicitly typed
  options: ApiOptions = {}
): Promise<any> => {
  console.log(uploadData);

  const formData = new FormData();

  uploadData.forEach(({ file, fieldName = "images", additionalData }) => {
    if (file instanceof File) {
      formData.append(fieldName, file); // Ensure raw `File` object is appended
    } else {
      console.error("Invalid file object:", file);
    }

    // Append additional data if provided
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : value.toString()
          );
        }
      });
    }
  });

  const uploadOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    ...options,
  };

  return makeApiCall("post", url, formData, {}, uploadOptions);
};

const extractFilename = (imagePath: string): string => {
  return imagePath.replace("/uploads/", ""); // ✅ Remove "/uploads/" prefix
};

export const deleteImage = async (imagePath: string): Promise<any> => {
  const filename = extractFilename(imagePath);
  if (!filename) throw new Error("Invalid image path provided for deletion.");

  const url = `/upload/v1/${filename}`;
  return apiDelete(url);
};

export const apiGet = (
  url: string,
  query: QueryParams | null = null,
  options?: ApiOptions
): Promise<any> => makeApiCall("get", url, null, query ?? {}, options);

export const apiPost = (url: string, data: any = null, options?: ApiOptions): Promise<any> =>
  makeApiCall("post", url, data, {}, options);

export const apiPut = (url: string, data: any = null, options?: ApiOptions): Promise<any> =>
  makeApiCall("put", url, data, {}, options);

export const apiPatch = (url: string, data: any = null, options?: ApiOptions): Promise<any> =>
  makeApiCall("patch", url, data, {}, options);

export const apiDelete = (url: string, data?: any): Promise<any> =>
  makeApiCall("delete", url, data || null);

export default makeApiCall;
