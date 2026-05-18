import { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  maxSize?: number;
  preview?: boolean;
}

export default function ImageUploader({
  value,
  onChange,
  label = '上传图片',
  accept = 'image/*',
  maxSize = 5 * 1024 * 1024,
  preview = true,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.size > maxSize) {
      alert(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setUploading(false);
      };
      reader.onerror = () => {
        alert('图片读取失败');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('上传失败');
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="admin-form-group">
      {label && <label className="admin-label">{label}</label>}
      
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {value && preview ? (
        <div className="relative">
          <img
            src={value}
            alt="预览"
            className="max-w-full max-h-48 object-contain rounded-lg border border-slate-200"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
            }
            ${uploading ? 'pointer-events-none opacity-50' : ''}
          `}
        >
          <div className="flex flex-col items-center gap-3">
            <div className={`
              w-14 h-14 rounded-full flex items-center justify-center
              ${isDragging ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}
            `}>
              {uploading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Upload size={24} />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                {uploading ? '上传中...' : '点击或拖拽图片到此处上传'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                支持 JPG, PNG, GIF 格式，最大 {maxSize / 1024 / 1024}MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}