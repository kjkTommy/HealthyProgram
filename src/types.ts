export interface ITask {
    title: string
    id: number
    isCompleted: boolean
}
export interface GlassWithPlusProps {
    incrementWater: () => void
    decrementWater: () => void
}
export interface ViewForGlassesProps extends GlassWithPlusProps {
    waterForOrganism: number
}
export interface WaterCheckerProps {
    weight: number
    size: number
}
export interface ValueForCalculating extends WaterCheckerProps {}
export interface MenuIconProps {
    open: boolean
    setOpen: (open: boolean) => void
}
export interface ProfileModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    textValue: { name: string; weight: string; size: string }
    setTextValue: React.Dispatch<
        React.SetStateAction<{ name: string; weight: string; size: string }>
    >
    onSave: () => void
}
export interface ModalHabitsProps
    extends Omit<ProfileModalProps, 'textValue' | 'setTextValue' | 'onSave'> {}

export enum ProfileFields {
    Name = 'name',
    Weight = 'weight',
    Size = 'size',
}
export interface DayOfTheWeekProps {
    name: string
    id: number
    isCompleted: boolean
}
export interface ProgressBarProps {
    progress: number
}
