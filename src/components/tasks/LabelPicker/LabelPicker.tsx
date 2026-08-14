import { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { labelColorClasses, PREDEFINED_LABELS, LABEL_COLORS } from "../../../constants/labelColorClasses";
import { addCustomLabel, isSelected, removeLabel, toggleLabel } from "./LabelPicker.config";
import type { Label } from "../../../types/label";

type LabelPickerProps = {
  selectedLabels: Label[];
  onChange: (labels: Label[]) => void;
};

const LabelPicker = ({ selectedLabels, onChange }: LabelPickerProps) => {
  const [customText, setCustomText] = useState("");
  const [customColor, setCustomColor] = useState<typeof LABEL_COLORS[number]>("indigo");

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">
        Etiquetas
      </label>

      {/* Seleccionadas */}
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selectedLabels.map((label) => (
            <span
              key={label.text}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border ${labelColorClasses[label.color]}`}
            >
              {label.text}
              <button
                type="button"
                onClick={() => removeLabel({ selectedLabels, text: label.text, onChange })}
                className="hover:opacity-70 cursor-pointer"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Predeterminadas */}
      <div className="flex flex-wrap gap-1.5">
        {PREDEFINED_LABELS.filter((l) => !isSelected({ selectedLabels, text: l.text })).map((label) => (
          <button
            key={label.text}
            type="button"
            onClick={() => toggleLabel({ label, selectedLabels, onChange })}
            className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border border-dashed opacity-70 hover:opacity-100 transition-opacity cursor-pointer ${labelColorClasses[label.color]}`}
          >
            <PlusIcon className="h-3 w-3" />
            {label.text}
          </button>
        ))}
      </div>

      {/* Custom */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Etiqueta personalizada..."
          className="flex-1 px-3 py-1.5 rounded-lg text-xs text-text-primary placeholder:text-text-muted bg-input border border-border focus:outline-none focus:border-primary transition-colors duration-150"
        />
        <select
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value as typeof LABEL_COLORS[number])}
          className="px-2 py-1.5 rounded-lg text-xs bg-input border border-border text-text-primary cursor-pointer focus:outline-none focus:border-primary transition-colors duration-150"
        >
          {LABEL_COLORS.map((color) => (
            <option key={color} value={color} className="bg-surface-base text-text-primary">{color}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => addCustomLabel({ customText, selectedLabels, onChange, setCustomText, customColor })}
          className="px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-text-on-primary text-xs font-semibold rounded-lg transition-colors duration-150 cursor-pointer shadow-sm"
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default LabelPicker;