import type { Label } from "../../../types/label";

type isSelectedProps = {
    selectedLabels: Label[]
    text: Label['text']
}

export const isSelected = ({selectedLabels, text}: isSelectedProps) =>
    selectedLabels.some((l) => l.text.toLowerCase() === text.toLowerCase());

type toggleLabelProps = {
    label: Label
    selectedLabels: Label[]
    onChange: (labels: Label[]) => void;
}
export const toggleLabel = ({label, selectedLabels, onChange}: toggleLabelProps) => {
    const text = label.text;
    if (isSelected({selectedLabels, text})) {
      onChange(selectedLabels.filter((l) => l.text.toLowerCase() !== label.text.toLowerCase()));
    } else {
      onChange([...selectedLabels, label]);
    }
  };

type addCustomLabelProps = {
    customText: string
    selectedLabels: Label[]
    onChange: (labels: Label[]) => void;
    setCustomText: React.Dispatch<React.SetStateAction<string>>
    customColor: Label['color']
}
  export const addCustomLabel = ({customText, selectedLabels, onChange, setCustomText, customColor} : addCustomLabelProps) => {
    const text = customText.trim();
    if (!text || isSelected({selectedLabels, text})) return;
    onChange([...selectedLabels, { text, color: customColor }]);
    setCustomText("");
  };

  type removeLabelProps = {
    selectedLabels: Label[]
    text: Label['text']
    onChange: (labels: Label[]) => void
  }

  export const removeLabel = ({selectedLabels, text, onChange}: removeLabelProps) => {
    onChange(selectedLabels.filter((l) => l.text !== text));
  };