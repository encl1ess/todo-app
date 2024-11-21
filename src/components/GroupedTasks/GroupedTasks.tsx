import { Accordion } from '@/ui/components/Accordion';
import { AccordionItem } from '@/ui/components/Accordion';
import { Checkbox } from '@/ui/components/Checkbox';
import { ProgressBar } from '@/ui/components/ProgressBar';
import './GroupedTasks.css';
import { TaskGroup } from '@/task/model/types';
import { useEffect, useMemo, useState } from 'react';
import { getTasks } from '@/task/api';

export const GroupedTasks = () => {
  const [tasks, setTasks] = useState<TaskGroup[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const totalTasks = useMemo(() => {
    if (!tasks) return 0;
    return tasks.reduce((count, group) => count + group.tasks.length, 0);
  }, [tasks]);

  const checkedCount = useMemo(() => {
    if (!tasks) return 0;
    return tasks.reduce(
      (count, group) =>
        count + group.tasks.filter((task) => task.checked).length,
      0,
    );
  }, [tasks]);

  const handleChange = (value: string, name: string) => {
    const updatedTasks = tasks?.map((group) => {
      if (group.name === name) {
        return {
          ...group,
          tasks: group.tasks.map((task) =>
            task.value === Number(value)
              ? { ...task, checked: !task.checked }
              : task,
          ),
        };
      }
      return group;
    });
    setTasks(updatedTasks);
  };

  const checkTaskCompleted = (group: TaskGroup) => {
    return group.tasks.every((task) => task.checked);
  };

  if (isError) return <p className="status">Something went wrong</p>;

  if (isLoading) return <p className="status">Loading...</p>;

  return (
    <section className="grouped-tasks-container">
      <ProgressBar
        title="Lodgify Grouped Tasks"
        value={getProgress(checkedCount, totalTasks)}
      />
      <Accordion>
        {tasks?.map((group) => {
          const isTaskCompleted = checkTaskCompleted(group);
          return (
            <AccordionItem
              key={group.name}
              label={group.name}
              isAccent={isTaskCompleted}
            >
              <ul>
                {group.tasks.map(({ checked, description, value }) => (
                  <li key={value}>
                    <Checkbox
                      label={description}
                      isChecked={checked}
                      value={value.toString()}
                      onChange={(value) => handleChange(value, group.name)}
                    />
                  </li>
                ))}
              </ul>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
};

const getProgress = (checkedCount: number, total: number) => {
  return checkedCount && total ? Math.round((checkedCount / total) * 100) : 0;
};
