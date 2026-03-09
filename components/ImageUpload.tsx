"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Loader2 } from "lucide-react"
import { UploadDropzone } from "@uploadthing/react"
import type { UploadRouter } from "@/app/api/uploadthing/core"

interface ImageUploadProps {
  value: string | null
  onChange: (url: string | null) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)

  return (
    <div className="space-y-4">
      {/* IMAGE PREVIEW */}
      {value && (
        <div className="relative h-40 w-40 overflow-hidden rounded-md border">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
          />

          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* UPLOAD AREA */}
      {!value && (
        <div className="relative">
          {isUploading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/80">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          <UploadDropzone<UploadRouter>
            endpoint="productImage"
            onUploadBegin={() => {
              setIsUploading(true)
            }}
            onClientUploadComplete={(res) => {
              setIsUploading(false)
              const file = res?.[0]
              if (file?.url) {
                onChange(file.url)
              }
            }}
            onUploadError={(error) => {
              setIsUploading(false)
              console.error("Upload error:", error)
              alert(error.message)
            }}
            appearance={{
              container:
                "border-dashed border-2 rounded-md p-4 hover:bg-muted transition",
            }}
          />
        </div>
      )}
    </div>
  )
}
