"use client"

import ProjectForm from "@/components/admin/project-form"

export default function NewProjectPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <ProjectForm isCreating={true} />
    </div>
  )
}
