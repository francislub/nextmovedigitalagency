import { f } from "@/lib/uploadthing"

export const uploadRouter = {
  productImage: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.url,
      }
    }),
}

export type UploadRouter = typeof uploadRouter
