import { Button, Upload } from "antd";
import { EventFormStepProps } from ".";

function Media({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const onSelectedMediaRemove = (index: number) => {
    const existingSelectedMediaFiles = [...selectedMediaFiles];
    const newSelectedMediaFiles = existingSelectedMediaFiles.filter(
      (_, i) => i !== index
    );
    setSelectedMediaFiles(newSelectedMediaFiles);
  };

  const onAlreadyUploadedMediaRemove = (index: number) => {
    const existingMediaFiles = [...eventData.media];
    const newMediaFiles = existingMediaFiles.filter((_, i) => i !== index);
    setEventData({ ...eventData, media: newMediaFiles });
  };

  return (
    <div>
      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          setSelectedMediaFiles((prev: any) => [...prev, file]);
          return false;
        }}
        multiple
        showUploadList={false}
      >
        <span className="text-gray-500 text-xs">Click here to upload</span>
      </Upload>

      <div className="flex flex-wrap gap-5 mt-5">
        {selectedMediaFiles.map((file: any, index: any) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col gap-5"
            key={file.name}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="media"
              className="w-40 h-40"
            />
            <span
              className="underline text-sm text-center cursor-pointer"
              onClick={() => onSelectedMediaRemove(index)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {eventData?.media?.map((url: any, index: any) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col gap-5"
            key={url}
          >
            <img src={url} alt="media" className="w-40 h-40" />
            <span
              className="underline text-sm text-center cursor-pointer"
              onClick={() => onAlreadyUploadedMediaRemove(index)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between col-span-3 mt-5">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
