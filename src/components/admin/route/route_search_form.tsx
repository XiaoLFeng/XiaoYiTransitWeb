import { useState } from 'react';
import type { GetRouteListQueryDTO } from '../../../models/dto/route_dto';

interface RouteSearchFormProps {
    onSearch: (params: GetRouteListQueryDTO) => void;
    onReset: () => void;
    initialParams?: GetRouteListQueryDTO;
}

/**
 * # 线路搜索表单组件
 * 用于线路列表的搜索和筛选
 */
export function RouteSearchForm({ onSearch, onReset, initialParams = {} }: RouteSearchFormProps) {
    const [formData, setFormData] = useState<GetRouteListQueryDTO>({
        route_number: initialParams.route_number || '',
        name: initialParams.name || '',
        status: initialParams.status
    });

    const handleInputChange = (field: keyof GetRouteListQueryDTO, value: string | number | undefined) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 过滤空值
        const searchParams: GetRouteListQueryDTO = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== '' && value !== undefined && value !== null) {
                searchParams[key as keyof GetRouteListQueryDTO] = value as string | number;
            }
        });
        
        onSearch(searchParams);
    };

    const handleReset = () => {
        const resetData: GetRouteListQueryDTO = {
            route_number: '',
            name: '',
            status: undefined
        };
        setFormData(resetData);
        onReset();
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h3 className="card-title text-lg mb-4">
                    <span className="text-primary">🔍</span>
                    搜索线路
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* 线路编号搜索 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">线路编号</span>
                            </label>
                            <input
                                type="text"
                                placeholder="请输入线路编号"
                                className="input input-bordered w-full"
                                value={formData.route_number || ''}
                                onChange={(e) => handleInputChange('route_number', e.target.value)}
                            />
                        </div>

                        {/* 线路名称搜索 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">线路名称</span>
                            </label>
                            <input
                                type="text"
                                placeholder="请输入线路名称"
                                className="input input-bordered w-full"
                                value={formData.name || ''}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        {/* 状态筛选 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">运营状态</span>
                            </label>
                            <select
                                className="select select-bordered w-full"
                                value={formData.status ?? ''}
                                onChange={(e) => {
                                    const value = e.target.value === '' ? undefined : Number(e.target.value);
                                    handleInputChange('status', value);
                                }}
                            >
                                <option value="">全部状态</option>
                                <option value={1}>运营中</option>
                                <option value={0}>停运</option>
                            </select>
                        </div>

                        {/* 搜索按钮 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">&nbsp;</span>
                            </label>
                            <div className="flex gap-2">
                                <button type="submit" className="btn btn-primary flex-1">
                                    <span className="text-sm">🔍</span>
                                    搜索
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-outline"
                                    onClick={handleReset}
                                >
                                    <span className="text-sm">🔄</span>
                                    重置
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
} 