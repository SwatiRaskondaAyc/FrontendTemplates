import { motion } from 'framer-motion';
import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { COLORS } from '../../../styles/colors';
import Button from '../../../components/ui/Button';
import ProfileWorkflowIllustration from '../../../components/illustrations/ProfileWorkflowIllustration';

const MotionDiv = motion.div;
const MotionSection = motion.section;

export default function UploadWorkspace() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <MotionSection
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(212, 217, 233, 0.74),rgba(11,17,34,0.8))] p-6 sm:p-8"
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <MotionDiv>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Data Intake</p>
          <h2 className="mt-3 text-2xl font-semibold">Upload Transaction Data</h2>
          <p className="mt-3 text-sm text-slate-300">
            Drop a CSV, Excel, or PDF file to start analysis. This creates a direct path from source data to insights.
          </p>

          <div
            className={`mt-6 rounded-2xl border-2 border-dashed p-5 transition ${
              isDragging
                ? `border-[${COLORS.primary}] bg-[${COLORS.primary}]/10`
                : 'border-white/20 bg-white/5'
            }`}
            onDrop={handleDrop}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            style={{
              borderColor: isDragging ? COLORS.primary : undefined,
              backgroundColor: isDragging ? `${COLORS.primary}10` : undefined
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls,.pdf"
            />

            {!uploadedFile && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl p-5 text-center transition hover:bg-white/5"
              >
                <Upload className="mx-auto h-8 w-8" style={{ color: COLORS.primary }} />
                <p className="mt-3 font-medium">Drop file here or browse</p>
                <p className="mt-1 text-xs text-slate-400">CSV, XLSX, XLS, PDF up to 25MB</p>
              </button>
            )}

            {uploadedFile && (
              <div className="flex items-center justify-between rounded-xl bg-black/20 p-4">
                <div>
                  <p className="text-sm font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-slate-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadedFile(null)}
                  className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4" />
              {uploadedFile ? 'Change File' : 'Select File'}
            </Button>
            {uploadedFile && (
              <Button variant="ghost" onClick={() => setUploadedFile(null)}>
                Clear
              </Button>
            )}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            ✓ Supports CSV, Excel, and PDF formats<br/>
            ✓ Processes up to 25MB files<br/>
            ✓ Direct integration with dashboard analysis
          </p>
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <ProfileWorkflowIllustration type="upload" />
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
