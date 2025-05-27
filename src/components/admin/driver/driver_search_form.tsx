import { useState } from 'react';
import { DriverStatus } from '../../../models/dto/driver_dto';
import type { GetDriverListQueryDTO } from '../../../models/dto/driver_dto';

/**
 * # 司机状态选项
 */
const DRIVER_STATUS_OPTIONS = [
    { value: DriverStatus.ACTIVE, label: '在职' },
    { value: DriverStatus.ON_LEAVE, label: '休假' },
    { value: DriverStatus.SUSPENDED, label: '停职' },
    { value: DriverStatus.RESIGNED, label: '离职' },
];

interface DriverSearchFormProps {
    onSearch: (params: GetDriverListQueryDTO) => void;
    onReset: () => void;
    initialParams?: GetDriverListQueryDTO;
}

/**
 * # 司机搜索表单组件
 */
export function DriverSearchForm({ onSearch, onReset, initialParams = {} }: DriverSearchFormProps) {
    const [searchParams, setSearchParams] = useState<GetDriverListQueryDTO>(initialParams);

    /**
     * 处理搜索参数变化
     */
    const handleParamChange = (field: keyof GetDriverListQueryDTO, value: string | number | undefined) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /**
     * 执行搜索
     */
    const handleSearch = () => {
        onSearch(searchParams);
    };

    /**
     * 重置搜索
     */
    const handleReset = () => {
        setSearchParams({});
        onReset();
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">工号</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入工号" 
                            className="input input-bordered"
                            value={searchParams.employee_id || ''}
                            onChange={(e) => handleParamChange('employee_id', e.target.value)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">姓名</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="输入姓名" 
                            className="input input-bordered"
                            value={searchParams.name || ''}
                            onChange={(e) => handleParamChange('name', e.target.value)}
                        />
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">状态</span>
                        </label>
                        <select 
                            className="select select-bordered"
                            value={searchParams.status !== undefined ? searchParams.status : ''}
                            onChange={(e) => handleParamChange('status', e.target.value ? Number(e.target.value) : undefined)}
                        >
                            <option value="">全部状态</option>
                            {DRIVER_STATUS_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">操作</span>
                        </label>
                        <div className="flex space-x-2">
                            <button 
                                className="btn btn-primary flex-1"
                                onClick={handleSearch}
                            >
                                搜索
                            </button>
                            <button 
                                className="btn btn-ghost flex-1"
                                onClick={handleReset}
                            >
                                重置
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 