import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

type DemoTourProps = {
  onComplete: () => void;
};

const DemoTour = ({ onComplete }: DemoTourProps) => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '[data-tour="sidebar-new-project"]',
          popover: {
            title: "Crea un proyecto",
            description: "Desde acá puedes iniciar un nuevo proyecto y empezar a organizar tareas.",
          },
        },
        {
          element: '[data-tour="task-columns"]',
          popover: {
            title: "Tablero Kanban",
            description: "Arrastra las tareas entre columnas para actualizar su estado.",
          },
        },
        {
          element: '[data-tour="sidebar-new-task"]',
          popover: {
            title: "Agrega tareas",
            description: "Crea nuevas tareas rápidamente desde cualquier vista del proyecto.",
          },
        },
      ],
    });

    driverObj.drive();

    return () => driverObj.destroy();
  }, [onComplete]);

  return null;
};

export default DemoTour;