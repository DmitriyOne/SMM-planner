import { ENDPOINTS, fetcher } from "@/06_shared/api"
import { TUploadResponse } from "@/06_shared/model/types"
import { RcFile, UploadRequestFile } from "rc-upload/lib/interface"

export const uploadImageToCloudinary = async (file: UploadRequestFile) => {
  const formData = new FormData()
  formData.append("file", file as RcFile)
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
  )

  return await fetcher<TUploadResponse>(
    ENDPOINTS.UPLOAD_IMAGE,
    "POST",
    { body: formData },
    true,
  )
}
