"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type {
  ContactLink,
  Experience,
  Portfolio,
  Project,
  SkillGroup,
} from "@/lib/portfolio";
import { downloadPortfolioJson } from "@/lib/portfolioStorage";
import { ui } from "@/lib/ui";

type PortfolioEditModalProps = {
  open: boolean;
  portfolio: Portfolio;
  onClose: () => void;
  onSave: (data: Portfolio) => void;
  onReset: () => void;
};

type FormState = {
  profile: Portfolio["profile"];
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
  contactLinks: ContactLink[];
};

function clonePortfolio(data: Portfolio): FormState {
  return {
    profile: { ...data.profile },
    skills: data.skills.map((group) => ({
      name: group.name,
      items: [...group.items],
    })),
    projects: data.projects.map((item) => ({ ...item })),
    experience: data.experience.map((item) => ({ ...item })),
    contactLinks: data.contactLinks.map((item) => ({ ...item })),
  };
}

function trimSkills(skills: string[]) {
  return skills.map((item) => item.trim()).filter(Boolean);
}

function nextId(items: { id: number }[]) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function SkillList({
  skills,
  addLabel,
  onChange,
  onClearError,
}: {
  skills: string[];
  addLabel: string;
  onChange: (skills: string[]) => void;
  onClearError: () => void;
}) {
  function updateSkill(index: number, value: string) {
    onChange(skills.map((item, i) => (i === index ? value : item)));
    onClearError();
  }

  function removeSkill(index: number) {
    onChange(skills.filter((_, i) => i !== index));
    onClearError();
  }

  function addSkill() {
    onChange([...skills, ""]);
    onClearError();
  }

  return (
    <div className="portfolio-modal-subsection">
      {skills.map((skill, index) => (
        <div key={index} className="portfolio-modal-inline-row">
          <input
            className="form-input"
            value={skill}
            placeholder={ui.editor.fields.skillName}
            onChange={(e) => updateSkill(index, e.target.value)}
          />
          <button
            type="button"
            className="contact-action portfolio-modal-remove"
            onClick={() => removeSkill(index)}
          >
            {ui.editor.remove}
          </button>
        </div>
      ))}
      <button type="button" className="contact-action" onClick={addSkill}>
        {addLabel}
      </button>
    </div>
  );
}

function SkillGroupEditor({
  group,
  onChange,
  onRemove,
  onClearError,
}: {
  group: SkillGroup;
  onChange: (group: SkillGroup) => void;
  onRemove: () => void;
  onClearError: () => void;
}) {
  return (
    <div className="portfolio-modal-card">
      <FormField label={ui.editor.fields.skillCategory}>
        <input
          className="form-input"
          value={group.name}
          placeholder="Backend"
          onChange={(e) => {
            onChange({ ...group, name: e.target.value });
            onClearError();
          }}
        />
      </FormField>
      <SkillList
        skills={group.items}
        addLabel={ui.editor.addSkill}
        onChange={(items) => {
          onChange({ ...group, items });
          onClearError();
        }}
        onClearError={onClearError}
      />
      <button
        type="button"
        className="contact-action portfolio-modal-remove"
        onClick={onRemove}
      >
        {ui.editor.removeCategory}
      </button>
    </div>
  );
}

export default function PortfolioEditModal({
  open,
  portfolio,
  onClose,
  onSave,
  onReset,
}: PortfolioEditModalProps) {
  const [form, setForm] = useState<FormState>(() => clonePortfolio(portfolio));
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(clonePortfolio(portfolio));
      setError("");
    }
  }, [open, portfolio]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  function updateProfile(field: keyof Portfolio["profile"], value: string) {
    setForm((current) => ({
      ...current,
      profile: { ...current.profile, [field]: value },
    }));
    if (error) setError("");
  }

  function updateProject(index: number, field: keyof Project, value: string) {
    setForm((current) => ({
      ...current,
      projects: current.projects.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
    if (error) setError("");
  }

  function updateExperience(
    index: number,
    field: keyof Experience,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      experience: current.experience.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
    if (error) setError("");
  }

  function updateContact(
    index: number,
    field: keyof ContactLink,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      contactLinks: current.contactLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
    if (error) setError("");
  }

  function buildPortfolio(): Portfolio | null {
    const { profile, projects, experience, contactLinks } = form;

    if (!profile.name.trim()) {
      setError(ui.editor.errors.nameRequired);
      return null;
    }
    if (!profile.role.trim()) {
      setError(ui.editor.errors.roleRequired);
      return null;
    }
    if (!profile.photoUrl.trim()) {
      setError(ui.editor.errors.photoRequired);
      return null;
    }

    for (const project of projects) {
      if (!project.title.trim()) {
        setError(ui.editor.errors.projectTitleRequired);
        return null;
      }
      if (!project.url.trim()) {
        setError(ui.editor.errors.projectUrlRequired);
        return null;
      }
    }

    for (const item of experience) {
      if (!item.company.trim()) {
        setError(ui.editor.errors.experienceCompanyRequired);
        return null;
      }
    }

    for (const link of contactLinks) {
      if (!link.label.trim()) {
        setError(ui.editor.errors.contactLabelRequired);
        return null;
      }
      if (!link.value.trim()) {
        setError(ui.editor.errors.contactValueRequired);
        return null;
      }
      if (!link.href.trim()) {
        setError(ui.editor.errors.contactHrefRequired);
        return null;
      }
    }

    for (const group of form.skills) {
      const hasItems = group.items.some((item) => item.trim());
      if (hasItems && !group.name.trim()) {
        setError(ui.editor.errors.skillCategoryRequired);
        return null;
      }
    }

    return {
      profile: {
        name: profile.name.trim(),
        role: profile.role.trim(),
        cvUrl: portfolio.profile.cvUrl,
        photoUrl: profile.photoUrl.trim(),
      },
      skills: form.skills
        .map((group) => ({
          name: group.name.trim(),
          items: trimSkills(group.items),
        }))
        .filter((group) => group.name.length > 0),
      projects: projects.map((item) => ({
        ...item,
        title: item.title.trim(),
        url: item.url.trim(),
        description: item.description.trim(),
      })),
      experience: experience.map((item) => ({
        ...item,
        company: item.company.trim(),
        role: item.role.trim(),
        period: item.period.trim(),
        description: item.description.trim(),
      })),
      contactLinks: contactLinks.map((item) => ({
        ...item,
        label: item.label.trim(),
        value: item.value.trim(),
        href: item.href.trim(),
      })),
    };
  }

  function handleSave() {
    const data = buildPortfolio();
    if (!data) return;
    onSave(data);
    onClose();
  }

  function handleExport() {
    const data = buildPortfolio();
    if (!data) return;
    downloadPortfolioJson(data);
  }

  function handleReset() {
    onReset();
    onClose();
  }

  return createPortal(
    <div
      className="portfolio-modal-backdrop"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="portfolio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="portfolio-modal-header">
          <span id="portfolio-modal-title">{ui.editor.title}</span>
          <button
            type="button"
            className="portfolio-modal-close"
            onClick={onClose}
            aria-label={ui.editor.close}
          >
            X
          </button>
        </div>

        <p className="portfolio-modal-hint">{ui.editor.hint}</p>

        <div className="portfolio-modal-body term-form">
          <section className="portfolio-modal-section">
            <h3 className="portfolio-modal-section-title">
              {ui.editor.sections.profile}
            </h3>
            <FormField label={ui.me.labels.name}>
              <input
                className="form-input"
                value={form.profile.name}
                onChange={(e) => updateProfile("name", e.target.value)}
              />
            </FormField>
            <FormField label={ui.me.labels.role}>
              <input
                className="form-input"
                value={form.profile.role}
                onChange={(e) => updateProfile("role", e.target.value)}
              />
            </FormField>
            <FormField label={ui.editor.fields.photo}>
              <input
                className="form-input"
                value={form.profile.photoUrl}
                onChange={(e) => updateProfile("photoUrl", e.target.value)}
                placeholder="/me.png"
              />
            </FormField>
          </section>

          <section className="portfolio-modal-section">
            <h3 className="portfolio-modal-section-title">
              {ui.editor.sections.skills}
            </h3>
            {form.skills.map((group, index) => (
              <SkillGroupEditor
                key={index}
                group={group}
                onChange={(nextGroup) =>
                  setForm((current) => ({
                    ...current,
                    skills: current.skills.map((item, i) =>
                      i === index ? nextGroup : item,
                    ),
                  }))
                }
                onRemove={() =>
                  setForm((current) => ({
                    ...current,
                    skills: current.skills.filter((_, i) => i !== index),
                  }))
                }
                onClearError={() => error && setError("")}
              />
            ))}
            <button
              type="button"
              className="contact-action"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  skills: [...current.skills, { name: "", items: [""] }],
                }))
              }
            >
              {ui.editor.addSkillGroup}
            </button>
          </section>

          <section className="portfolio-modal-section">
            <h3 className="portfolio-modal-section-title">
              {ui.editor.sections.projects}
            </h3>
            {form.projects.map((project, index) => (
              <div key={project.id} className="portfolio-modal-card">
                <FormField label={ui.editor.fields.projectTitle}>
                  <input
                    className="form-input"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(index, "title", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.projectUrl}>
                  <input
                    className="form-input"
                    value={project.url}
                    onChange={(e) => updateProject(index, "url", e.target.value)}
                  />
                </FormField>
                <FormField label={ui.editor.fields.projectDescription}>
                  <textarea
                    className="form-textarea"
                    value={project.description}
                    onChange={(e) =>
                      updateProject(index, "description", e.target.value)
                    }
                  />
                </FormField>
                <button
                  type="button"
                  className="contact-action portfolio-modal-remove"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      projects: current.projects.filter((_, i) => i !== index),
                    }))
                  }
                >
                  {ui.editor.remove}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="contact-action"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  projects: [
                    ...current.projects,
                    {
                      id: nextId(current.projects),
                      title: "",
                      url: "",
                      description: "",
                    },
                  ],
                }))
              }
            >
              {ui.editor.addProject}
            </button>
          </section>

          <section className="portfolio-modal-section">
            <h3 className="portfolio-modal-section-title">
              {ui.editor.sections.experience}
            </h3>
            {form.experience.map((item, index) => (
              <div key={item.id} className="portfolio-modal-card">
                <FormField label={ui.editor.fields.company}>
                  <input
                    className="form-input"
                    value={item.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.role}>
                  <input
                    className="form-input"
                    value={item.role}
                    onChange={(e) =>
                      updateExperience(index, "role", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.period}>
                  <input
                    className="form-input"
                    value={item.period}
                    onChange={(e) =>
                      updateExperience(index, "period", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.description}>
                  <textarea
                    className="form-textarea"
                    value={item.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                  />
                </FormField>
                <button
                  type="button"
                  className="contact-action portfolio-modal-remove"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      experience: current.experience.filter((_, i) => i !== index),
                    }))
                  }
                >
                  {ui.editor.remove}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="contact-action"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  experience: [
                    ...current.experience,
                    {
                      id: nextId(current.experience),
                      company: "",
                      role: "",
                      period: "",
                      description: "",
                    },
                  ],
                }))
              }
            >
              {ui.editor.addExperience}
            </button>
          </section>

          <section className="portfolio-modal-section">
            <h3 className="portfolio-modal-section-title">
              {ui.editor.sections.contact}
            </h3>
            {form.contactLinks.map((link, index) => (
              <div key={`${link.label}-${index}`} className="portfolio-modal-card">
                <FormField label={ui.editor.fields.contactLabel}>
                  <input
                    className="form-input"
                    value={link.label}
                    onChange={(e) =>
                      updateContact(index, "label", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.contactValue}>
                  <input
                    className="form-input"
                    value={link.value}
                    onChange={(e) =>
                      updateContact(index, "value", e.target.value)
                    }
                  />
                </FormField>
                <FormField label={ui.editor.fields.contactHref}>
                  <input
                    className="form-input"
                    value={link.href}
                    onChange={(e) =>
                      updateContact(index, "href", e.target.value)
                    }
                  />
                </FormField>
                <button
                  type="button"
                  className="contact-action portfolio-modal-remove"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      contactLinks: current.contactLinks.filter(
                        (_, i) => i !== index,
                      ),
                    }))
                  }
                >
                  {ui.editor.remove}
                </button>
              </div>
            ))}
            <button
              type="button"
              className="contact-action"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  contactLinks: [
                    ...current.contactLinks,
                    { label: "", value: "", href: "" },
                  ],
                }))
              }
            >
              {ui.editor.addContact}
            </button>
          </section>
        </div>

        {error ? <p className="portfolio-modal-error">{error}</p> : null}

        <div className="portfolio-modal-actions">
          <button type="button" className="contact-action" onClick={handleSave}>
            {ui.editor.save}
          </button>
          <button type="button" className="contact-action" onClick={handleExport}>
            {ui.editor.export}
          </button>
          <button type="button" className="contact-action" onClick={handleReset}>
            {ui.editor.reset}
          </button>
          <button type="button" className="contact-action" onClick={onClose}>
            {ui.editor.cancel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
